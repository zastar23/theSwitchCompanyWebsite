import { _ as __nuxt_component_0 } from './nuxt-link-0d39ff03.mjs';
import { _ as __nuxt_component_0$1 } from './Arrow-14824c85.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode } from 'vue';
import { u as useRoute } from './server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { d as data } from './posts-a2d2650e.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'h3';
import 'defu';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[post]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const routeParam = route.params.post;
    const [filteredData] = data.posts.filter((post) => {
      return post.postId === routeParam;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Arrow = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "post" }, _attrs))} data-v-cf180e35><div class="post-header" data-v-cf180e35>`);
      if (unref(filteredData).postArticleTitle) {
        _push(`<h1 class="post-title" data-v-cf180e35>`);
        if (unref(filteredData).postArticleTitle.whiteText) {
          _push(`<span class="white" data-v-cf180e35>${ssrInterpolate(unref(filteredData).postArticleTitle.whiteText)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="blue" data-v-cf180e35>${ssrInterpolate(unref(filteredData).postArticleTitle.blueText[0])}</span><span class="effect"${ssrRenderAttr("data-effect", unref(filteredData).postArticleTitle.textWithEffect)} data-v-cf180e35>${ssrInterpolate(unref(filteredData).postArticleTitle.textWithEffect)}</span><span class="blue" data-v-cf180e35>${ssrInterpolate(unref(filteredData).postArticleTitle.blueText[1])}</span></h1>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="post-body" data-v-cf180e35><div class="flex" data-v-cf180e35><div class="date" data-v-cf180e35><span class="date-nr" data-v-cf180e35>${ssrInterpolate(unref(filteredData).postDate.day)}</span><hr data-v-cf180e35><span class="date-month-year" data-v-cf180e35>${ssrInterpolate(unref(filteredData).postDate.month)} ${ssrInterpolate(unref(filteredData).postDate.year)}</span></div><div class="domains" data-v-cf180e35><ul class="domains-list" data-v-cf180e35><!--[-->`);
      ssrRenderList(unref(filteredData).postDomain, (domain, i) => {
        _push(`<li class="domains-list-item" data-v-cf180e35>${ssrInterpolate(domain)}</li>`);
      });
      _push(`<!--]--></ul></div></div><div class="post-body-content" data-v-cf180e35><div class="articles" data-v-cf180e35><div class="article" data-v-cf180e35><h2 class="article-title" data-v-cf180e35>${ssrInterpolate(unref(filteredData).postArticle1.title)}</h2><!--[-->`);
      ssrRenderList(unref(filteredData).postArticle1.paragraphs, (p, i) => {
        _push(`<p class="article-text" data-v-cf180e35>${ssrInterpolate(p)}</p>`);
      });
      _push(`<!--]--><h2 class="article-title" data-v-cf180e35>${ssrInterpolate(unref(filteredData).postArticle2.title)}</h2><!--[-->`);
      ssrRenderList(unref(filteredData).postArticle2.subarticles, (subArt, i) => {
        _push(`<div class="subarticles" data-v-cf180e35><h2 class="subarticles-title"${ssrRenderAttr("data-title-effect", subArt == null ? void 0 : subArt.title)}${ssrRenderAttr("data-title-nr", subArt == null ? void 0 : subArt.nr)} data-v-cf180e35>${ssrInterpolate(subArt == null ? void 0 : subArt.title)}</h2><!--[-->`);
        ssrRenderList(subArt == null ? void 0 : subArt.paragraphs, (subArtPara, i2) => {
          _push(`<p class="subarticles-text" data-v-cf180e35>${ssrInterpolate(subArtPara)}</p>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(filteredData).quote) {
        _push(`<div class="quote" data-v-cf180e35><p class="quote-title" data-v-cf180e35>${ssrInterpolate(unref(filteredData).quote)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="post-last" data-v-cf180e35><h2 class="article-title" data-v-cf180e35>${ssrInterpolate((_a = unref(filteredData).postArticle3) == null ? void 0 : _a.title)}</h2><!--[-->`);
      ssrRenderList((_b = unref(filteredData).postArticle3) == null ? void 0 : _b.paragraphs, (p, i) => {
        _push(`<p class="article-text" data-v-cf180e35>${ssrInterpolate(p)}</p>`);
      });
      _push(`<!--]--></div></div></div><div class="back" data-v-cf180e35>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "back-btn",
        to: "/blog"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Arrow, { class: "rotate" }, null, _parent2, _scopeId));
            _push2(` Back`);
          } else {
            return [
              createVNode(_component_Arrow, { class: "rotate" }),
              createTextVNode(" Back")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[post].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _post_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf180e35"]]);

export { _post_ as default };
//# sourceMappingURL=_post_-1f2a1fb7.mjs.map
