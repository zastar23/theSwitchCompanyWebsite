<template>
  <section class="blog-section" id="blog">
    <div class="blog-cta">
      <h2>Practices. Ideas. Trends</h2>
      <div class="blog-actions">
        <h3 data-aos="fade-left">Our Blog</h3>
        <p data-aos="fade-right">Sharing with you quality information from our field of work.</p>
        <NuxtLink to="/blog" class="blog-link" data-aos="fade-left">read</NuxtLink>
      </div>
    </div>
    <div data-aos="fade-right" class="newsletter">
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
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .blog-cta {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 100px 1fr;
    background-color: var(--color-neutral-900);

    h2 {
      transform: rotate(-90deg);
      font-size: var(--step-section-subtitles);
      font-family: var(--ff-secondary);
      font-weight: var(--bold);
      align-self: center;
      grid-column: 1;
      grid-row: 1;
      white-space: nowrap;
      margin: 0 0 0 -2rem;
      padding-inline-end: 2rem;
      color: var(--color-neutral-100);

      @media (min-width: 768px) {
        margin-top: 5rem;
      }
    }

    .blog-actions {
      align-self: center;
      justify-self: center;
      text-align: center;
      color: var(--color-neutral-100);
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding-right: 1rem;
      align-items: center;
      margin-inline-start: -3rem;

      h3 {
        font-family: var(--ff-secondary);
        font-size: var(--step-section-titles);
        font-weight: var(--bold);
      }

      p {
        font-family: var(--ff-primary);
        font-size: var(--step-paragraps);
      }

      .blog-link {
        background-color: var(--color-neutral-100);
        padding: 1rem 3rem;
        letter-spacing: 1px;
        font-size: var(--step-paragraps);
        color: var(--color-neutral-900);
        font-family: var(--ff-secondary);
        border-radius: 40px;
        border: 1px solid var(--color-neutral-100);
        transition: all 250ms ease;
        text-decoration: none;

        &:hover {
          color: var(--color-accent);
          border: 1px solid var(--color-accent);
          background-color: var(--color-neutral-900);
          transform: scale(1.2);
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }

  .newsletter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

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
        transition: all 250ms ease;
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
