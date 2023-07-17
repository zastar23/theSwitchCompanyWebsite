import { _ as __nuxt_component_0$1 } from './nuxt-link-0d39ff03.mjs';
import { _ as __nuxt_component_0$2 } from './Arrow-14824c85.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { a as useSeoMeta } from './server.mjs';
import { d as data } from './posts-a2d2650e.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PostCard",
  __ssrInlineRender: true,
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const { post } = props;
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Arrow = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-card" }, _attrs))} data-v-4c193ef5><div class="blog-card-header" data-v-4c193ef5><img${ssrRenderAttr("src", (_a = unref(post)) == null ? void 0 : _a.postImg)} alt="blog post image" width="100" height="100" data-v-4c193ef5></div><div class="blog-card-body" data-v-4c193ef5><h2 class="blog-card-title" data-v-4c193ef5>${ssrInterpolate(unref(post).postTitle)}</h2><p class="blog-card-paragraph" data-v-4c193ef5>${ssrInterpolate(unref(post).postCardParagraph)}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, { class: "blog-card-link" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`read `);
            _push2(ssrRenderComponent(_component_Arrow, null, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode("read "),
              createVNode(_component_Arrow)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PostCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4c193ef5"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "The Switch Company's Blog",
      description: "Read about any news regarding the company's field of work, interests and practices.",
      author: "Ciril Florena",
      creator: "Florin Porut",
      generator: "Nuxt 3",
      colorScheme: "normal",
      robots: {
        index: true,
        follow: true
      },
      ogUrl: "https://www.theswichcompany.ro/blog"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PostCard = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "center" }, _attrs))} data-v-dcf3efd3><div class="container" data-v-dcf3efd3><div class="title" data-v-dcf3efd3><h1 data-v-dcf3efd3><span data-v-dcf3efd3>&lt;</span>Our Blog<span data-v-dcf3efd3>/&gt;</span></h1><h2 data-v-dcf3efd3>Practices. Ideas. Trends</h2><h3 data-v-dcf3efd3>Sharing with you quality information from our field of work.</h3></div></div><section class="blog-posts" data-v-dcf3efd3><!--[-->`);
      ssrRenderList(unref(data).posts, (post) => {
        _push(`<div data-v-dcf3efd3>`);
        _push(ssrRenderComponent(_component_PostCard, {
          post,
          onClick: ($event) => _ctx.$router.push(`blog/${post.postId}`)
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></section><div class="bg-white" data-v-dcf3efd3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/home",
        class: "home-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Go back`);
          } else {
            return [
              createTextVNode("Go back")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="newsletter" data-v-dcf3efd3><h2 data-v-dcf3efd3>Want new articles before they get published? Subscribe to our Awesome Newsletter.</h2><form class="subscribtion-form" data-v-dcf3efd3><label for="firstname" data-v-dcf3efd3>first name</label><input required type="text" id="firstname" placeholder="First Name" data-v-dcf3efd3><label for="lastname" data-v-dcf3efd3>last name</label><input required type="text" id="lastname" placeholder="Last Name" data-v-dcf3efd3><label for="email" data-v-dcf3efd3>e-mail</label><input required type="email" id="email" placeholder="E-mail" data-v-dcf3efd3><input type="submit" value="submit" class="submit-button" data-v-dcf3efd3></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-dcf3efd3"]]);

export { index as default };
//# sourceMappingURL=index-ef25e2ca.mjs.map
