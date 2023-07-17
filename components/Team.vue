<script setup lang="ts">
  import data from "../db/db.json";
  import type Person from "~/types/person";

  let showModal = ref(false);
  let personData: Person;

  const openModal = function (person: Person): void {
    personData = person;
    showModal.value = !showModal.value;
  };
</script>

<template>
  <section class="team-section" id="team">
    <h2>Our Team</h2>
    <div class="team">
      <div v-for="person in data.team" :key="person.id">
        <TeamCards :person="person" @open-modal="openModal" />
      </div>
    </div>
    <div>
      <Modal v-if="showModal" :personData="personData" @close-modal="showModal = !showModal" />
    </div>
  </section>
</template>

<style scoped lang="scss">
  .team-section {
    background-image: url("../assets/images/team-waves.svg");
    background-size: contain;
    background-position-x: 20%;
    background-position-y: 100%;
    background-repeat: no-repeat;
    display: grid;
    grid-template-columns: 100px 1fr 50px;
    align-content: start;
    margin-block-start: 15rem;
    padding-block-start: 10rem;
    border-top: 1px solid var(--color-neutral-900);
    position: relative;

    @media (min-width: 760px) {
      background-size: cover;
      margin-block-start: 15rem;
      border: none;
      min-height: 100vh;
      background-attachment: fixed;
      background-position-y: -1;
      background-repeat: no-repeat;
    }

    h2 {
      transform: rotate(-90deg);
      font-size: var(--step-section-titles);
      font-family: var(--ff-secondary);
      font-weight: var(--bold);
      align-self: start;
      grid-column: 1;
      grid-row: 1;
      white-space: nowrap;
      margin: 3rem 0 0 -2rem;
      padding-inline-end: 2rem;

      @media (min-width: 1400px) {
        margin-top: 25rem;
        margin-left: 1rem;
      }
    }

    .team {
      grid-row: 1;
      grid-column: span 2;
      display: flex;
      margin-block-start: 2rem;
      margin-inline-start: -4rem;
      flex-direction: column;
      align-items: space-between;
      justify-content: center;
      @media (min-width: 1000px) {
        display: flex;
        flex-direction: row;
        align-items: start;
        justify-content: space-around;
      }
    }
  }
</style>
