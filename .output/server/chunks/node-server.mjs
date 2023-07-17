globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=31536000, immutable"}}}},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
overrideConfig(_runtimeConfig);
const runtimeConfig = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => runtimeConfig;
deepFreeze(appConfig);
function getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/blog-1-bg.webp": {
    "type": "image/webp",
    "etag": "\"40e2-wo2VQbUXKUTuuhngk+c53gptrbI\"",
    "mtime": "2023-07-17T14:01:24.395Z",
    "size": 16610,
    "path": "../public/blog-1-bg.webp"
  },
  "/blog-bg.webp": {
    "type": "image/webp",
    "etag": "\"11a8-ZKqRcBragxRITbMt0nNCfw/oqG8\"",
    "mtime": "2023-07-17T13:40:27.315Z",
    "size": 4520,
    "path": "../public/blog-bg.webp"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-PZPOnhFSMmhferIodqS460KWK6I\"",
    "mtime": "2023-07-16T05:39:54.000Z",
    "size": 15406,
    "path": "../public/favicon.ico"
  },
  "/florena-modal-pic.webp": {
    "type": "image/webp",
    "etag": "\"25ea-xQrp0Eydn5f4uyGKy+ZxtCsJCJQ\"",
    "mtime": "2023-07-17T13:50:26.320Z",
    "size": 9706,
    "path": "../public/florena-modal-pic.webp"
  },
  "/florena-portrait.webp": {
    "type": "image/webp",
    "etag": "\"b9e-dzPIZZZKr7ahz17os2DAT663xEY\"",
    "mtime": "2023-07-17T13:50:17.460Z",
    "size": 2974,
    "path": "../public/florena-portrait.webp"
  },
  "/mihai-modal-pic.webp": {
    "type": "image/webp",
    "etag": "\"2176-VMcL8v6NX4po42G2fManT+ZQsFM\"",
    "mtime": "2023-07-17T13:48:55.594Z",
    "size": 8566,
    "path": "../public/mihai-modal-pic.webp"
  },
  "/mihai-petrus-portrait.webp": {
    "type": "image/webp",
    "etag": "\"141c-fIUhimmLyj95w0pDSI6r14vgacM\"",
    "mtime": "2023-07-17T13:48:04.296Z",
    "size": 5148,
    "path": "../public/mihai-petrus-portrait.webp"
  },
  "/_nuxt/Arrow.d7394eff.js": {
    "type": "application/javascript",
    "etag": "\"19d-cLiNK98jAxCtxnDX+zwBORxHRu4\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 413,
    "path": "../public/_nuxt/Arrow.d7394eff.js"
  },
  "/_nuxt/background-hills.b0105516.webp": {
    "type": "image/webp",
    "etag": "\"3464e-i8omIJ1GyCz4iBCuzV2GP1R9Nj4\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 214606,
    "path": "../public/_nuxt/background-hills.b0105516.webp"
  },
  "/_nuxt/behance-icon.dcb4141f.svg": {
    "type": "image/svg+xml",
    "etag": "\"1175-v4OO6Toa/vxDNUTgb6HkS+3QPK0\"",
    "mtime": "2023-07-17T14:14:26.660Z",
    "size": 4469,
    "path": "../public/_nuxt/behance-icon.dcb4141f.svg"
  },
  "/_nuxt/bg-map.daa2675a.webp": {
    "type": "image/webp",
    "etag": "\"9ae8-9lRGZkT4IRSRx8sR032Dh9dCooY\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 39656,
    "path": "../public/_nuxt/bg-map.daa2675a.webp"
  },
  "/_nuxt/blog-bg.6222b2f3.webp": {
    "type": "image/webp",
    "etag": "\"11a8-ZKqRcBragxRITbMt0nNCfw/oqG8\"",
    "mtime": "2023-07-17T14:14:26.660Z",
    "size": 4520,
    "path": "../public/_nuxt/blog-bg.6222b2f3.webp"
  },
  "/_nuxt/blue-arrow.dc1ac1f7.svg": {
    "type": "image/svg+xml",
    "etag": "\"52adb-GaIDZcBYPv+8+hlGz0n/dLwF0Wk\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 338651,
    "path": "../public/_nuxt/blue-arrow.dc1ac1f7.svg"
  },
  "/_nuxt/entry.86cfaa12.js": {
    "type": "application/javascript",
    "etag": "\"252f5-ZrY+kZRbz43+vMljtGJYkXHJ2Po\"",
    "mtime": "2023-07-17T14:14:26.665Z",
    "size": 152309,
    "path": "../public/_nuxt/entry.86cfaa12.js"
  },
  "/_nuxt/entry.acc6bd04.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6e46-vPccJBW1BGbIR9ixef9ysFok8Pc\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 28230,
    "path": "../public/_nuxt/entry.acc6bd04.css"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.ddf800f7.js": {
    "type": "application/javascript",
    "etag": "\"907-eCsore9Qs1OnN7clz+jwdxrxns0\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 2311,
    "path": "../public/_nuxt/error-404.ddf800f7.js"
  },
  "/_nuxt/error-500.5c658522.js": {
    "type": "application/javascript",
    "etag": "\"78b-KDyzdSQEPQsaoCetbLflJIWnBp8\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 1931,
    "path": "../public/_nuxt/error-500.5c658522.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-component.7aced144.js": {
    "type": "application/javascript",
    "etag": "\"4cc-AunEMvTjtiWpUAgYmFhqO9UXpEY\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 1228,
    "path": "../public/_nuxt/error-component.7aced144.js"
  },
  "/_nuxt/facebook-icon.667afd28.svg": {
    "type": "image/svg+xml",
    "etag": "\"c31-wb3BsgKNOUQL/29ijjkgMLRR+oI\"",
    "mtime": "2023-07-17T14:14:26.660Z",
    "size": 3121,
    "path": "../public/_nuxt/facebook-icon.667afd28.svg"
  },
  "/_nuxt/home.0f9388df.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"67fc-NiYYSHvJJm1dLfQdTnMxhGfg9Xs\"",
    "mtime": "2023-07-17T14:14:26.662Z",
    "size": 26620,
    "path": "../public/_nuxt/home.0f9388df.css"
  },
  "/_nuxt/home.8b3c27f8.js": {
    "type": "application/javascript",
    "etag": "\"60d3-5fCmiaU/NayZlaIQ5fxvFCfZ7ak\"",
    "mtime": "2023-07-17T14:14:26.665Z",
    "size": 24787,
    "path": "../public/_nuxt/home.8b3c27f8.js"
  },
  "/_nuxt/index.29b34594.js": {
    "type": "application/javascript",
    "etag": "\"ab3-b0eGsLHrCOj+Y1YjKtJxDDin8Y4\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 2739,
    "path": "../public/_nuxt/index.29b34594.js"
  },
  "/_nuxt/index.3b8afd80.js": {
    "type": "application/javascript",
    "etag": "\"2ce-6sf5SaqicZavTIfBMXTmc/8kxLA\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 718,
    "path": "../public/_nuxt/index.3b8afd80.js"
  },
  "/_nuxt/index.abb1fa7b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13ac-1RJTSMVCjKwqvTqlUB/+e8UHAlM\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 5036,
    "path": "../public/_nuxt/index.abb1fa7b.css"
  },
  "/_nuxt/index.d7054f42.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b0-ot74NnZDjtYvBEj4x11ptYbrCs8\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 688,
    "path": "../public/_nuxt/index.d7054f42.css"
  },
  "/_nuxt/index.f38269b6.js": {
    "type": "application/javascript",
    "etag": "\"e3-xiqNAwLA3wDUQBtnua2g+abdvGs\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 227,
    "path": "../public/_nuxt/index.f38269b6.js"
  },
  "/_nuxt/instagram-icon.baf580f2.svg": {
    "type": "image/svg+xml",
    "etag": "\"13a9-1dohpJahz/WBRWHu6tOdIL6k8v0\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 5033,
    "path": "../public/_nuxt/instagram-icon.baf580f2.svg"
  },
  "/_nuxt/linkedin-icon.d7ce53a6.svg": {
    "type": "image/svg+xml",
    "etag": "\"e3b-XmEGTHg1osL/m5+P362Im6aKnUo\"",
    "mtime": "2023-07-17T14:14:26.658Z",
    "size": 3643,
    "path": "../public/_nuxt/linkedin-icon.d7ce53a6.svg"
  },
  "/_nuxt/logo-switch-cta.77d06cc6.svg": {
    "type": "image/svg+xml",
    "etag": "\"16ba6-HA3Sw/cmxCHBmip0unhKHM96+r0\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 93094,
    "path": "../public/_nuxt/logo-switch-cta.77d06cc6.svg"
  },
  "/_nuxt/mission-icon.cb53e109.svg": {
    "type": "image/svg+xml",
    "etag": "\"b55b-m+keBK0j51r+O0xOmP/pBMM8mmA\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 46427,
    "path": "../public/_nuxt/mission-icon.cb53e109.svg"
  },
  "/_nuxt/modal-close.176f3680.svg": {
    "type": "image/svg+xml",
    "etag": "\"7b6-IFRP4ySjROget5q7e/y8gMokhV0\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 1974,
    "path": "../public/_nuxt/modal-close.176f3680.svg"
  },
  "/_nuxt/nuxt-link.03bbd9b7.js": {
    "type": "application/javascript",
    "etag": "\"10e1-wpWJFLZDd2X6HmKIA0nJ5IE5g2U\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 4321,
    "path": "../public/_nuxt/nuxt-link.03bbd9b7.js"
  },
  "/_nuxt/posts.988ec249.js": {
    "type": "application/javascript",
    "etag": "\"254f-6cVPnueqvtR1hj5x/W8McntOhck\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 9551,
    "path": "../public/_nuxt/posts.988ec249.js"
  },
  "/_nuxt/team-waves.c1615169.svg": {
    "type": "image/svg+xml",
    "etag": "\"132825-tiQ7PmBi3GsHZ32ueVeaN5HZRbc\"",
    "mtime": "2023-07-17T14:14:26.662Z",
    "size": 1255461,
    "path": "../public/_nuxt/team-waves.c1615169.svg"
  },
  "/_nuxt/values-icon.d9d802e9.svg": {
    "type": "image/svg+xml",
    "etag": "\"eac7-TwPqJalrqh1oZYG8f0RkDZbSuis\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 60103,
    "path": "../public/_nuxt/values-icon.d9d802e9.svg"
  },
  "/_nuxt/vision-icon.804e8193.svg": {
    "type": "image/svg+xml",
    "etag": "\"ae31-DSVzKpGHkrSgU5IPWNVbY/uxLD4\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 44593,
    "path": "../public/_nuxt/vision-icon.804e8193.svg"
  },
  "/_nuxt/_plugin-vue_export-helper.c27b6911.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.c27b6911.js"
  },
  "/_nuxt/_post_.de964c9d.js": {
    "type": "application/javascript",
    "etag": "\"afe-GMGmPKO1k0xkPl6+Aqy9WCVgJcg\"",
    "mtime": "2023-07-17T14:14:26.664Z",
    "size": 2814,
    "path": "../public/_nuxt/_post_.de964c9d.js"
  },
  "/_nuxt/_post_.e3b6c62f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"13af-FdHz+Jgc7dQqEmeZQFRLybtS/Rg\"",
    "mtime": "2023-07-17T14:14:26.661Z",
    "size": 5039,
    "path": "../public/_nuxt/_post_.e3b6c62f.css"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_m88DT9 = () => import('./renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_m88DT9, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_m88DT9, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
