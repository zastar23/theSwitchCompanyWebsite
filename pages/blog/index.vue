<script setup lang="ts">
  import data from "../../db/posts.json";
  useSeoMeta({
    title: "The Switch Company's Blog",
    description: "Read about any news regarding the company's field of work, interests and practices.",
    author: "Ciril Florena",
    creator: "Florin Porut",
    generator: "Nuxt 3",
    colorScheme: "normal",
    robots: {
      index: true,
      follow: true,
    },
    ogUrl: "https://www.theswichcompany.ro/blog",
  });
</script>

<template>
  <div class="center">
    <div class="container">
      <div class="title">
        <h1><span>&lt;</span>Our Blog<span>/&gt;</span></h1>
        <h2>Practices. Ideas. Trends</h2>
        <h3>Sharing with you quality information from our field of work.</h3>
      </div>
    </div>
    <section class="blog-posts">
      <div v-for="post in data.posts" :key="post.postId">
        <PostCard :post="post" @click="$router.push(`blog/${post.postId}`)" />
      </div>
    </section>
    <div class="bg-white">
      <NuxtLink to="/home" class="home-btn">Go back</NuxtLink>
    </div>
    <div class="newsletter">
      <h2>Want new articles before they get published? Subscribe to our Awesome Newsletter.</h2>
      <form class="subscribtion-form">
        <label for="firstname">first name</label>
        <input required type="text" id="firstname" placeholder="First Name" />

        <label for="lastname">last name</label>
        <input required type="text" id="lastname" placeholder="Last Name" />

        <label for="email">e-mail</label>
        <input required type="email" id="email" placeholder="E-mail" />

        <input type="submit" value="submit" class="submit-button" />
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .center {
    text-align: center;
  }
  .container {
    padding-inline: 2rem;
    background-image: url("../../assets/images/blog-bg.webp");
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: grid;
    place-items: center;

    @media (min-width: 1000px) {
      background-position-y: -10rem;
    }

    .title {
      h1 {
        font-family: var(--ff-secondary);
        font-size: var(--step-section-titles);
        font-weight: bold;
        white-space: nowrap;

        span {
          color: var(--color-accent);
        }
      }
      h2 {
        font-family: var(--ff-secondary);
        text-align: center;
        font-size: var(--step-section-subtitles);
        font-weight: bold;
        margin-block: 1rem;
      }

      h3 {
        font-family: var(--ff-primary);
        font-size: var(--step-paragraps);
        color: var(--color-accent);
        text-align: center;
        // max-width: 25ch;
      }
    }
  }

  .blog-posts {
    background-color: #f2f2f2;
    padding: 1rem;
    padding-bottom: 10rem;

    @media (min-width: 760px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }

    @media (min-width: 1000px) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
    }
  }

  .post-link {
    text-decoration: none;
  }
  .home-btn {
    background-color: var(--color-neutral-100);
    padding: 1rem 3rem;
    letter-spacing: 1px;
    font-size: var(--step-paragraps);
    color: var(--color-neutral-900);
    font-family: var(--ff-secondary);
    border-radius: 40px;
    border: 1px solid var(--color-neutral-100);
    transition-property: border-color, color, background-color;
    transition-duration: 250ms;
    text-decoration: none;
    margin: 2rem auto;
    width: 8rem;

    display: block;

    &:hover {
      color: var(--color-accent);
      border: 1px solid var(--color-accent);
      background-color: var(--color-neutral-900);
      cursor: pointer;
    }
  }

  .bg-white {
    background-color: #f2f2f2;
    height: 10vh;
    margin-top: -3rem;
  }

  .newsletter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: var(--color-neutral-100);

    h2 {
      font-size: var(--step-section-subtitles);
      font-family: var(--ff-secondary);
      line-height: 1.3;
      color: var(--color-neutral-900);
      text-align: center;
      margin-block-start: 2rem;
    }

    .subscribtion-form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding-left: 2rem;

      label {
        display: none;
      }

      input {
        background-color: var(--color-neutral-100);
        outline: none;
        border: 0;
        border-bottom: 1px solid var(--color-neutral-900);
        width: 80%;
        margin-block: 2rem;
        font-size: var(--step-paragraps);
        font-family: var(--ff-primary);
        padding-block-end: 1rem;
        color: var(--color-neutral-900);

        &:focus {
          border-color: var(--color-accent);
        }
      }

      input[type="email"] {
        grid-column: span 2;
      }

      input[type="submit"] {
        grid-column: span 2;
        align-self: center;
        justify-self: center;
        width: 10rem;
        height: 3rem;
        background-color: var(--color-neutral-900);
        font-size: var(--step-btn-text);
        color: var(--color-neutral-100);
        font-family: var(--ff-primary);
        border-radius: 40px;
        border: 1px solid var(--color-neutral-100);
        transition-property: color, border-color, background-color, transform;
        transition-duration: 250ms;
        padding: 0;

        &:hover {
          color: var(--color-accent);
          border: 1px solid var(--color-accent);
          background-color: var(--color-neutral-100);
          transform: scale(1.1);
          cursor: pointer;
        }
      }
    }
  }
</style>
