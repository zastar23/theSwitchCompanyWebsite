<script setup lang="ts"></script>

<template>
  <section class="introduction">
    <div class="site-title">
      <h1>hello</h1>
      <p>we <b>upgrade</b> your <b>digital experiences</b></p>
    </div>
    <div class="site-content">
      <p class="left">Through software automation, web development, design & marketing.</p>
      <hr />
      <p class="right">Between your business objectives and what your customers want.</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
  // first page intro
  .introduction {
    background-image: url("../assets/images/background-hills.webp");
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: -30rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-inline: 1rem;
    padding-block-start: 2rem;
    min-height: 90vh;

    @media (min-width: 1000px) {
      background-position-x: 0;
      min-height: 100vh;
      background-attachment: fixed;
      background-position-y: -5rem;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .site-title {
    display: flex;
    flex-direction: column;

    align-items: center;
    margin-block-start: 5rem;

    & > h1 {
      font-size: var(--step-main-title);
      font-family: "Rubik", sans-serif;
      font-weight: 900;
      background-image: radial-gradient(circle at center, #16c3f3, #102572);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 100%;
    }

    & > p {
      font-size: var(--step-section-subtitles);
      text-align: center;
      font-family: "Rubik", sans-serif;
      font-weight: 200;

      & > b {
        font-weight: var(--bold);
      }
    }
  }

  .site-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    font-family: "Montserrat", sans-serif;
    font-size: var(--step-paragraps);
    padding-block-end: 1rem;

    .left {
      text-align: right;
      align-self: flex-start;
    }

    .right {
      align-self: flex-end;
    }

    hr {
      height: 10rem;
    }
  }
</style>
