<script setup lang="ts">
  const props = defineProps({
    post: {
      required: true,
      type: Object,
    },
  });

  const { post } = props;
</script>

<template>
  <div class="blog-card">
    <div class="blog-card-header">
      <img :src="post?.postImg" alt="blog post image" width="100" height="100" />
    </div>
    <div class="blog-card-body">
      <h2 class="blog-card-title">{{ post.postTitle }}</h2>
      <p class="blog-card-paragraph">{{ post.postCardParagraph }}</p>
      <NuxtLink class="blog-card-link">read <Arrow /></NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .blog-card {
    margin-block: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    background-color: var(--color-neutral-900);
    width: 100%;
    height: fit-content;

    padding-block-end: 1rem;
    text-align: left;
    max-width: 30rem;
    transition-property: box-shadow, transform;
    transition-duration: 350ms;

    &:hover {
      transform: scale(1.1);
      -webkit-box-shadow: 2px 3px 32px -11px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 2px 3px 32px -11px rgba(0, 0, 0, 0.75);
      box-shadow: 2px 3px 32px -11px rgba(0, 0, 0, 0.75);
      cursor: pointer;
    }

    &-header {
      flex: 1;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-body {
      padding-inline: 1rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
      padding-inline: 2rem;
    }

    &-title {
      font-family: var(--ff-primary);
      font-size: var(--step-section-subtitles);
      color: var(--color-neutral-100);
      font-weight: 700;
      line-height: 1.5;
      text-align: left;
    }

    &-paragraph {
      font-family: var(--ff-primary);
      font-size: var(--step-paragraps);
      color: var(--color-neutral-100);
      font-weight: 500;
      line-height: 1.2;
      text-align: left;
    }

    &-link {
      font-family: var(--ff-primary);
      font-size: var(--step-btn-text);
      color: var(--color-neutral-100);
      align-self: end;
      font-weight: bold;
      border-bottom: 2px solid var(--color-neutral-900);
      transition: all 250ms ease;

      &:hover {
        cursor: pointer;
        border-bottom: 2px solid var(--color-neutral-100);
      }
    }
  }
</style>
