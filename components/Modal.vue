<script setup lang="ts">
  import type Person from "../types/person";
  const props = defineProps<{ personData: Person }>();

  const emit = defineEmits(["close-modal"]);
</script>

<template>
  <div class="blur"></div>
  <div class="container">
    <div class="modal">
      <button class="close" @click="emit('close-modal')">
        <img src="../assets/images/modal-close.svg" alt="Closing icon for modal" width="10" height="10" class="close-modal-icon" />
      </button>
      <div class="modal-header">
        <img :src="props.personData.ModalImg" alt="portrait" width="100" height="100" />
        <div class="person">
          <h3 class="name">{{ props.personData.name }}</h3>
          <ul>
            <li v-for="(role, i) in props.personData.functions" :key="i">{{ role }}</li>
          </ul>
        </div>
      </div>
      <div class="modal-body">
        <p v-for="(paragraph, i) in props.personData.modalText" :key="i" class="content">{{ paragraph }}</p>
      </div>
      <div class="modal-footer">
        <NuxtLink :to="props.personData.linkedinLink" target="_blank" class="follow">follow on linkedin </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .blur {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: var(--color-neutral-100);
    z-index: 900;
    opacity: 0.7;
    filter: blur(5px);
  }
  .container {
    position: absolute;
    top: 25%;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    margin: 0 auto;
    z-index: 1000;

    @media (min-width: 760px) {
      top: 0;
    }

    .modal {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;

      @media (min-width: 760px) {
        max-width: 40rem;
        margin: 0 auto;
      }

      .close {
        font-size: 1.5rem;
        font-weight: bold;
        border-radius: 50%;
        color: var(--color-neutral-900);
        background-color: var(--color-accent);
        margin-bottom: -4rem;
        z-index: 1000;
        align-self: end;
        border: 1px solid black;

        &:hover {
          cursor: pointer;
        }

        .close-modal-icon {
          width: 1rem;
          height: 1rem;
          transform: rotate(45deg);

          &:hover {
            color: var(--color-accent);
          }
        }

        &:hover {
          background-color: var(--color-neutral-100);
          border: 1px solid white;
        }
      }

      &-header {
        background-color: var(--color-neutral-100);
        width: 100%;
        text-align: center;
        border-color: var(--color-neutral-900);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;

        img {
          width: 10rem;
          height: 10rem;
          border-radius: 10px;

          @media (min-width: 760px) {
            width: 20rem;
            height: 20rem;
          }
        }

        .person {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;

          .name {
            font-family: var(--ff-primary);
            font-weight: var(--bold);
            font-size: var(--step-section-subtitles);

            &::first-letter {
              color: var(--color-accent);
            }
          }

          ul {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            li {
              font-family: var(--ff-secondary);
              font-size: var(--step-paragraps);
            }
          }
        }
      }

      &-body {
        background-color: var(--color-neutral-900);
        padding: 1rem;
        overflow-y: auto;
        height: 15rem;
        border-radius: 10px;

        &::-webkit-scrollbar {
          width: 10px;
        }

        &::-webkit-scrollbar-track {
          background-color: gray;
          border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: var(--color-accent);
          border-radius: 12px;
        }

        p {
          font-family: var(--ff-primary);
          color: var(--color-neutral-100);
          margin: 1rem 0;
          font-weight: var(--regular);
        }
      }

      &-footer .follow {
        font-family: var(--ff-secondary);
        font-size: var(--step-paragraps);
        color: var(--color-neutral-900);
        background-color: var(--color-neutral-100);
        border: 1px solid var(--color-neutral-900);
        border-radius: 40px;
        padding: 1rem 2rem;
        text-decoration: none;

        &:hover {
          color: var(--color-accent);
          border-color: var(--color-accent);
          cursor: pointer;
          transition: all 250ms ease;
        }
      }

      &-footer {
        @media (min-width: 760px) {
          margin-block-start: 2rem;
        }
      }
    }
  }
</style>
