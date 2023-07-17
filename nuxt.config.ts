// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";
export default defineNuxtConfig({
  alias: {
    assets: "/<rootDir>/assets",
    "@": resolve(__dirname, "/"),
  },
  css: ["~/assets/main.scss"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
});
