<script setup lang="ts">
  const slider = function () {
    const slides = document.querySelectorAll<HTMLElement>(".slide");
    const dotsContainer = document.querySelector(".dots") as HTMLDivElement;

    // create dots
    const createDots = function () {
      slides.forEach(function (s, i) {
        dotsContainer.insertAdjacentHTML("beforeend", `<button class='dot' data-slide=${i}></button>`);
      });
    };

    const activateDot = function (slide: number) {
      document.querySelectorAll(".dot").forEach((dot) => dot.classList.remove("active"));

      document?.querySelector(`.dot[data-slide='${slide}']`)?.classList.add("active");
    };

    const goToSlide = function (slide: number) {
      slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%`));
    };

    const init = function () {
      createDots();
      activateDot(0);
      goToSlide(0);
    };
    init();

    // event handler
    dotsContainer.addEventListener("click", function (e) {
      const target = e.target as HTMLElement;
      if (target.classList.contains("dot")) {
        const { slide } = target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });
  };

  onMounted(() => {
    slider();
  });
</script>

<template>
  <section class="about" id="about">
    <div class="about-intro">
      <hr data-aos="fade-down" />
      <p data-aos="fade-left">
        We are an independent company, creating unique, cutting-edge digital experiences for global companies and smart local businesses. We drive <b>transformation</b>, led by <b>strategy</b>,
        expressed by <b>performance</b>.
      </p>
      <h2 data-aos="fade-left">about us</h2>
      <hr data-aos="fade-up" />
    </div>
    <div data-aos="zoom-in-up" class="slider">
      <div class="vision slide-1 slide">
        <img class="icon" src="../assets/images/vision-icon.svg" alt="icon representig a telescope" width="100" height="100" />
        <h2>our vision</h2>
        <hr />
        <p>We upgrade digital experiences to impact social, economic and environmental standards.</p>
      </div>
      <div class="mission slide-2 slide">
        <img class="icon" src="../assets/images/mission-icon.svg" alt="icon representig a telescope" width="100" height="100" />
        <h2>our mission</h2>
        <hr />
        <p>Improving and solving our clients’ business challenges through technology change, innovation & performance.</p>
      </div>
      <div class="values slide-3 slide">
        <img class="icon" src="../assets/images/values-icon.svg" alt="icon representig a telescope" width="100" height="100" />
        <h2>our values</h2>
        <hr />
        <p>Innovation. Boldness. Impact. Versatility. Passion. Integrity.Creativity. Stability.</p>
      </div>
      <div class="dots"></div>
    </div>
    <div class="about-outro">
      <hr data-aos="fade-down" />

      <p data-aos="fade-right">
        This world moves too fast for businesses to wait around or go silent. There’s an race for your consumer’s attention and if you don’t grab it, someone else will. We work with brands that
        operate with a <b>healthy dose of impatience</b> to win that race, steal back the attention and grow.
      </p>
      <h2 data-aos="fade-right">how we think</h2>

      <hr data-aos="fade-down" />
    </div>
  </section>
</template>

<style scoped lang="scss">
  .about {
    max-width: 1440px;
    margin: 0 auto;
  }
  .about-intro,
  .about-outro {
    min-height: 100vh;
    background-color: var(--color-neutral-100);
    overflow: hidden;
  }

  // about section

  .about-intro {
    display: flex;
    flex-direction: column-reverse;
    padding-inline: 1rem;

    hr {
      flex: 1;
      align-self: flex-start;
      margin-left: 5%;
    }

    p {
      font-family: "Montserrat", sans-serif;
      font-size: var(--step-paragraps);
      align-self: center;
      margin-block: 2rem;
      margin-inline-start: 1rem;
      line-height: 1.5;
      letter-spacing: 1;
      width: 80%;
      align-self: start;

      @media (min-width: 760px) {
        margin-inline-start: 2.5rem;
      }
    }

    h2 {
      font-size: var(--step-section-titles);
      font-family: "Rubik", sans-serif;
      font-weight: var(--bold);
      margin: 0 0 1rem 1rem;
    }

    b {
      color: var(--color-accent);
    }
  }

  //  slider

  .slider {
    padding-block-start: 5rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-height: 80vh;
    background-color: var(--color-neutral-100);
    max-width: 700px;
    margin: 0 auto;

    .vision {
      position: absolute;
      top: 25%;
    }

    .mission {
      position: absolute;
      top: 25%;
    }

    .values {
      position: absolute;
      top: 25%;
    }

    .slide-1 {
      transform: translateX(0);
    }

    .slide-2 {
      transform: translateX(400px);
    }

    .slide-3 {
      transform: translateX(800px);
    }

    .slide {
      text-align: center;
      padding-inline: 1rem;
      z-index: 1;
      transition: all 350ms ease;

      h2 {
        font-family: var(--ff-secondary);
        font-size: var(--step-section-subtitles);
        font-weight: var(--bold);
      }

      .icon {
        position: absolute;
        top: -4rem;
        left: 1rem;
        width: 10rem;
        height: 10rem;
        z-index: -1;
      }

      hr {
        margin-inline-start: -1rem;
        width: 90%;
      }

      p {
        font-family: var(--ff-primary);
        font-size: var(--step-paragraps);
        font-weight: var(--light);
        line-height: 1.5;
      }
    }
    .dots {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-block-start: 4rem;
    }
  }
  .about-outro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;

    hr {
      flex: 1;
      margin-right: 5%;
    }

    p {
      font-family: "Montserrat", sans-serif;
      font-size: var(--step-paragraps);
      text-align: right;
      margin-block: 2rem;
      margin-inline-end: 2rem;
      line-height: 1.5;
      letter-spacing: 1;
      width: 80%;
    }

    h2 {
      font-size: var(--step-section-titles);
      font-family: "Rubik", sans-serif;
      font-weight: var(--bold);
      margin: 0 2rem 1rem 2rem;
      text-align: right;
    }

    b {
      color: var(--color-accent);
    }
  }
</style>
