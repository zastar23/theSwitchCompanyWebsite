<script setup lang="ts">
  const router = useRouter();
  const greet: Ref<Element | null> = ref(null);

  const changePage = function (): void {
    if (greet.value !== null) {
      greet.value.classList.toggle("initial-position");
      greet.value.classList.toggle("final-position");
    }
  };

  const transitionTo = function (): void {
    setTimeout(() => {
      greet.value?.classList.toggle("transition-pages");
      greet.value?.addEventListener("transitionend", () => {
        router.push("/home");
      });
    }, 1500);
  };

  onMounted(() => {
    changePage();
    transitionTo();
  });
</script>

<template>
  <div class="container">
    <h1 ref="greet" class="greet initial-position">hello</h1>
  </div>
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--color-neutral-900);
    overflow: hidden;
  }

  .greet {
    font-size: var(--step-main-title);
    color: var(--color-neutral-100);
    font-family: "Rubik", sans-serif;
    font-weight: 900;
  }

  .initial-position {
    transform: translateY(-100px);
    opacity: 0;
  }

  .final-position {
    transition: transform 500ms ease;
    transform: translateY(0);
    opacity: 1;
  }

  .transition-pages {
    transition: transform 1500ms ease;
    transform: scale(150) translateX(-16.5px);

    @media (max-width: 760px) {
      transform: scale(150) translateX(9px);
    }
  }
</style>
