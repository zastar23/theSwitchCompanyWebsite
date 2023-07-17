<script setup lang="ts">
  useHead({
    htmlAttrs: { lang: "en" },
    link: [{ rel: "canonical", href: "https://theswitchcompany.ro/" }],
  });
</script>

<template>
  <NuxtPage></NuxtPage>
</template>

<style lang="scss">
  html {
    background-color: var(--color-neutral-100);
  }
  body {
    color: var(--color-neutral-900);
  }

  .dot {
    border-radius: 50px;
    border: 1px solid var(--color-neutral-900);
    padding: 0.2rem 0.2rem;
    margin-inline: 1rem;
    background-color: var(--color-neutral-100);

    &:hover {
      cursor: pointer;
    }
  }

  .active {
    background-color: var(--color-accent);
    padding: 0.5rem 0.5rem;
  }
</style>
