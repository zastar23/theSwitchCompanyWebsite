<script setup lang="ts">
  useSeoMeta({
    title: "The Switch Company",
    description: "The Switch Company presetantion website regarding their bussines plans, visions, team and services.",
    author: "Ciril Florena",
    creator: "Florin Porut",
    generator: "Nuxt 3",
    colorScheme: "normal",
    robots: {
      index: true,
      follow: true,
    },
    ogUrl: "https://www.theswichcompany.ro",
  });
  onMounted(() => {
    const nav = document.querySelector(".desktop-nav-list") as HTMLUListElement;
    const square = document.querySelector(".square") as HTMLDivElement;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          nav.classList.add("scroll-change-hidden");
          square.classList.add("scroll-change-visible");
        } else {
          nav.classList.remove("scroll-change-hidden");
          square.classList.remove("scroll-change-visible");
        }
      });
    });
    if (nav) {
      observer.observe(nav);
    }
  });
</script>

<template>
  <div class="container" id="intro">
    <SiteHeader />
    <main class="main">
      <Introduction data-aos="fade-down" />
      <Cta data-aos="fade-down" />
      <About />
      <Services />
      <Team />
      <Blog data-aos="zoom-in-up" />
    </main>
    <Footer data-aos="fade-up" />
  </div>
</template>

<style scoped lang="scss">
  .container {
    background-color: var(--color-neutral-100);
    width: 100%;

    margin: 0 auto;
  }
</style>
