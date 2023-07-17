<template>
  <section class="cta">
    <img src="../assets/images/logo-switch-cta.svg" alt="switch company logo" width="100" height="100" loading="lazy" />
    <!--TODO : REPLACE WITH SVG-->
    <button>
      <a href="#about">see more</a>
    </button>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .cta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-neutral-900);
    color: black;
    gap: 2rem;
    min-height: 100vh;

    img {
      width: 15rem;
      outline: none;
    }

    button {
      background-color: var(--color-neutral-100);
      border-radius: var(--border-radius);
      font-size: var(--step-paragraps);
      padding: 0.5rem 2rem;
      font-family: "Montserrat", sans-serif;
      transition-property: color, background-color;
      transition-duration: 250ms;

      a {
        text-decoration: none;
        color: var(--color-neutral-900);

        &:hover {
          color: var(--color-accent);
        }
      }

      &:hover {
        background-color: var(--color-neutral-900);
        color: var(--color-accent);
        cursor: pointer;
      }
    }
  }
</style>
