<script setup lang="ts">
  const toggleDetails = function (e: Event): void {
    const target = e.target as HTMLElement;
    const lists = document.querySelectorAll(".list") as NodeListOf<HTMLUListElement>;
    if (target.tagName !== "H3") return;

    lists.forEach((list) => {
      if (target.dataset.title === list.dataset.list) {
        list.classList.toggle("hidden");
      }
    });
  };
</script>

<template>
  <section class="services" id="services">
    <h2 data-aos="fade-up">Our Services</h2>
    <div @click="toggleDetails" class="services-lists" data-aos="fade-left">
      <div class="border">
        <div class="heading-container">
          <img src="../assets/images/blue-arrow.svg" alt="arrow icon" width="50" height="50" loading="lazy" />
          <h3 data-title="1">Robotic Process Automation</h3>
        </div>

        <ul class="list hidden" data-list="1">
          <li>Software Automation</li>
          <li>Process Improvement</li>
          <li>RPA Training</li>
          <li>Consultancy</li>
        </ul>
      </div>
      <div class="border">
        <div class="heading-container">
          <img src="../assets/images/blue-arrow.svg" alt="arrow icon" width="50" height="50" loading="lazy" />
          <h3 data-title="2">Design & Branding</h3>
        </div>

        <ul class="list hidden" data-list="2">
          <li>Graphic & UI/UX Design</li>
          <li>Brand Identity</li>
          <li>Packaging & Merch</li>
          <li>Signage & Pos</li>
        </ul>
      </div>
      <div class="border">
        <div class="heading-container">
          <img src="../assets/images/blue-arrow.svg" alt="arrow icon" width="50" height="50" loading="lazy" />
          <h3 data-title="3">Social Media Marketing & Management</h3>
        </div>

        <ul data-list="3" class="list hidden">
          <li>Content Strategy & Creation</li>
          <li>Social Profiles Management</li>
          <li>Copywriting</li>
          <li>Insight & Reporting</li>
          <li>Consultancy</li>
        </ul>
      </div>
      <div class="border">
        <div class="heading-container">
          <img src="../assets/images/blue-arrow.svg" alt="arrow icon" width="50" height="50" loading="lazy" />
          <h3 data-title="4">Web Design & Development</h3>
        </div>

        <ul data-list="4" class="list hidden">
          <li>Front & Back End</li>
          <li>Web Design</li>
          <li>Landing Page</li>
        </ul>
      </div>
      <div class="border">
        <div class="heading-container">
          <img src="../assets/images/blue-arrow.svg" alt="arrow icon" width="50" height="50" loading="lazy" />
          <h3 data-title="5">Photo & Video</h3>
        </div>

        <ul data-list="5" class="list hidden">
          <li>Product Photography</li>
          <li>Video Editing</li>
        </ul>
      </div>
      <div class="border">
        <div class="heading-container">
          <img src="../assets/images/blue-arrow.svg" alt="arrow icon" width="50" height="50" loading="lazy" />
          <h3 data-title="6">Suppport & Maintennance</h3>
        </div>

        <ul data-list="6" class="list hidden">
          <li>Product Rollout</li>
          <li>Hypercare</li>
          <li>24/7 Technical Support</li>
        </ul>
      </div>
    </div>
    <div class="services-footer">
      <button data-aos="fade-right">work with us</button>
      <span data-aos="fade-left">what we <b>switch</b> to everyday</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .services {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    position: relative;
    overflow: hidden;
    padding-block-start: 5rem;
    width: 100%;

    @media (min-width: 425px) {
      grid-template-columns: 100px auto;
    }

    @media (min-width: 1000px) {
      margin: 0 auto;
      max-width: 1440px;
    }

    h2 {
      font-family: var(--ff-secondary);
      font-size: var(--step-section-titles);
      font-weight: var(--bold);
      letter-spacing: 1.5px;
      line-height: 1;
      // white-space: nowrap;
      grid-column: 1 / 3;
      grid-row: 1;
      width: fit-content;
      height: fit-content;
      align-self: center;
      justify-self: center;
      text-align: center;
      // padding-inline-start: 1rem;

      @media (min-width: 425px) {
        grid-column: 1;
        rotate: -90deg;
        grid-row: 1;
        height: fit-content;
        padding-inline-end: 2rem;
        white-space: nowrap;
        margin-block-start: 8rem;
      }

      @media (min-width: 1300px) {
        justify-self: center;
      }
    }

    .heading-container {
      display: flex;
      align-items: start;

      img {
        margin-block-start: -0.5rem;
      }
    }

    &-lists {
      padding-inline-end: 0.5rem;
      grid-column: 2 / 3;
      grid-row: 2;
      width: 100%;
      .border {
        border-top: 1px solid white;
        padding-block: 1rem;
        transition: all 350ms ease;

        @media (min-width: 760px) {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      }

      h3 {
        font-family: var(--ff-secondary);
        font-size: var(--step-section-subtitles);
        font-weight: var(--bold);

        &:hover {
          cursor: pointer;
        }

        @media (min-width: 760px) {
          white-space: normal;
        }
      }

      ul {
        transition: all 350ms ease;
        display: flex;
        flex-direction: column;

        li {
          font-family: var(--ff-primary);
          font-size: var(--step-paragraps);
          margin-block-start: 0.2rem;
          margin-inline-start: 3rem;

          @media (min-width: 760px) {
            margin-block-end: 0.2rem;
            width: 20ch;
          }
        }
      }
    }

    .services-footer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 5rem;
      grid-column: span 2;

      span {
        font-family: var(--ff-secondary);
        font-size: var(--step-paragraps);
        align-self: center;

        b {
          color: var(--color-accent);
        }
      }

      button {
        align-self: center;
        margin-top: 5rem;

        color: var(--color-neutral-100);
        background-color: var(--color-neutral-900);
        border-radius: var(--border-radius);
        font-size: var(--step-paragraps);
        padding: 0.5rem 2rem;
        font-family: "Montserrat", sans-serif;
        font-weight: var(--regular);

        &:hover {
          cursor: pointer;
        }
      }
    }

    @media (min-width: 760px) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      h2 {
        rotate: 0deg;
      }
    }
  }

  .hidden {
    opacity: 0;
    transform: translateY(-50px);
    position: absolute;
    pointer-events: none;

    @media (min-width: 760px) {
      opacity: 1;
      transform: none;
      position: static;
      pointer-events: all;
    }
  }
</style>
