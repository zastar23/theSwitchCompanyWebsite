<script setup lang="ts">
  import type Person from "../types/person";
  const props = defineProps<{ person: Person }>();

  const emit = defineEmits(["open-modal"]);

  function clicked(person: Person): void {
    emit("open-modal", person);
  }
</script>

<template>
  <div data-aos="zoom-in-up" class="card" :id="props.person.id.toString()" @click="clicked(props.person)">
    <div class="card-header">
      <img loading="lazy" class="image" :src="props.person.imgsrc" alt="Portret of Mihai" width="100" height="100" />

      <button>
        <Arrow />
      </button>
    </div>
    <div class="card-body">
      <h3>{{ props.person.name }}</h3>
      <ul>
        <li v-for="(job, i) in person.functions" :key="i">
          {{ job }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 80%;
    max-width: 30rem;
    margin: 0 auto;
    padding: 1rem 0.5rem 0 0.5rem;

    @media (min-width: 760px) {
      padding: 1rem 2rem 0 2rem;
      justify-content: space-between;
    }

    &:hover {
      background-color: hsla(193, 90%, 52%, 0.3);
      border-radius: 10px;
      transition: all 500ms ease-in;
      cursor: pointer;
    }

    &-header {
      width: 100%;
      position: relative;
      z-index: 1;

      .image {
        width: 10rem;
        height: 10rem;
        border-radius: 100%;
        border: 5px solid var(--color-neutral-100);

        @media (min-width: 1000px) {
          width: 15rem;
          height: 15rem;
        }
      }

      .image:hover {
        border: 5px solid var(--color-accent);
      }

      // .hover-img {
      //   // width: 20rem;
      //   // height: 20rem;
      //   // position: absolute;
      //   // top: -37px;
      //   // left: -20px;
      //   // opacity: 0;
      //   // z-index: 0;

      //   // &:hover {
      //   //   opacity: 0.7;
      //   //   z-index: 0;
      //   // }

      // }
    }

    &-body {
      width: 100%;
      margin-bottom: 5rem;
      margin-top: 2rem;

      h3 {
        font-size: var(--step-section-subtitles);
        font-weight: var(--bold);
        font-family: var(--ff-secondary);
        white-space: nowrap;
        text-align: center;

        @media (min-width: 1000px) {
          text-align: left;
        }
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-block-start: 1rem;

        li {
          font-size: var(--step-btn-text);
          font-family: var(--ff-primary);

          @media (min-width: 1000px) {
            text-align: left;
            white-space: nowrap;
          }
        }
      }
    }

    button {
      border-radius: 100%;
      color: var(--color-accent);
      font-size: 2rem;
      border: 0;
      margin-left: -3rem;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
