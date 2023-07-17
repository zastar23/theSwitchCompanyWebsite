<script setup lang="ts">
  import { ref } from "vue";
  const square = ref();
  const nav = ref();
  const link = ref();

  const toggleNav = function () {
    if (square.value) {
      square.value.classList.toggle("rotate-square-clock");
      square.value.classList.toggle("rotate-square-counterClock");
    }

    if (nav.value) {
      nav.value.classList.toggle("slide-in-top");
      nav.value.classList.toggle("slide-out-top");
    }
  };

  const navigateTo = function () {
    nav.value.classList.toggle("slide-in-top");
    nav.value.classList.toggle("slide-out-top");
    square.value.classList.remove("rotate-square-clock");
  };
</script>

<template>
  <div class="square rotate-square-counterClock" @click="toggleNav" ref="square">
    <img src="../assets/images/menu-btn.webp" alt="nav toggle icon" width="10" height="10" />
  </div>
  <header class="header">
    <div class="header-container">
      <div class="container-logo">
        <NuxtLink to="/home">
          <img src="../assets/images/switch-logo-051.webp" width="100" height="100" alt="" class="logo" />
        </NuxtLink>
      </div>
      <nav ref="nav" class="header-nav slide-out-top">
        <ul class="nav-list">
          <li @click="navigateTo" ref="link" class="nav-list-item"><span class="item-counter">00</span><a href="#intro" class="nav-list-link">Home</a></li>
          <li @click="navigateTo" ref="link" class="nav-list-item"><span class="item-counter">01</span><a href="#services" class="nav-list-link">Services</a></li>
          <li @click="navigateTo" ref="link" class="nav-list-item"><span class="item-counter">02</span><a href="#about" class="nav-list-link">About</a></li>
          <li @click="navigateTo" ref="link" class="nav-list-item"><span class="item-counter">03</span><a href="#team" class="nav-list-link">Team</a></li>
          <li @click="navigateTo" ref="link" class="nav-list-item"><span class="item-counter">04</span><a href="#blog" class="nav-list-link">Blog</a></li>
          <li @click="navigateTo" ref="link" class="nav-list-item"><span class="item-counter">05</span><a href="#contact" class="nav-list-link">Contact</a></li>
        </ul>
      </nav>
      <ul ref="desktop-nav-list" class="desktop-nav-list">
        <li class="desktop-nav-list-item"><span class="desktop-item-counter">00.</span><a href="#intro" class="desktop-nav-list-link">Home</a></li>
        <li class="desktop-nav-list-item"><span class="desktop-item-counter">01.</span><a href="#services" class="desktop-nav-list-link">Services</a></li>
        <li class="desktop-nav-list-item"><span class="desktop-item-counter">02.</span><a href="#about" class="desktop-nav-list-link">About</a></li>
        <li class="desktop-nav-list-item"><span class="desktop-item-counter">03.</span><a href="#team" class="desktop-nav-list-link">Team</a></li>
        <li class="desktop-nav-list-item"><span class="desktop-item-counter">04.</span><a href="#blog" class="desktop-nav-list-link">Blog</a></li>
        <li class="desktop-nav-list-item"><span class="desktop-item-counter">05.</span><a href="#contact" class="desktop-nav-list-link">Contact</a></li>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="scss">
  .header {
    overflow: hidden;
    z-index: 3;
    background-color: var(--color-neutral-100);

    &-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
    }

    &-nav {
      font-family: var(--ff-secondary);
      font-weight: var(--medium);
      font-size: var(--step-nav);
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 3;
    }

    .nav-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--color-neutral-100);
      min-height: 100vh;
      width: 100vw;
      max-width: 1440px;

      &-item {
        display: flex;
        gap: 0.5rem;
        text-align: center;

        &:nth-child(2n) {
          flex-direction: row-reverse;
        }
      }

      &-link {
        text-decoration: none;
        color: var(--color-neutral-900);
        transition-property: color, text-shadow;
        transition-duration: 250ms;

        &:hover {
          color: var(--color-neutral-100);
          text-shadow: -1px -1px 0 var(--color-neutral-900), 1px -1px 0 var(--color-neutral-900), -1px 1px 0 var(--color-neutral-900), 1px 1px 0 var(--color-neutral-900);
        }
      }

      .item-counter {
        font-size: var(--step-nav-counter);
        color: var(--color-accent);
        align-self: end;
      }
    }
  }

  .logo {
    width: var(--logo);
    height: var(--logo);
  }

  .square {
    width: 25px;
    height: 25px;
    background-color: var(--color-accent);
    text-align: center;
    position: sticky;
    top: 7%;
    left: 90%;
    transition-property: opacity;
    transition-duration: 250ms;
    z-index: 4;

    @media (min-width: 760px) {
      left: 95%;
    }

    @media (min-width: 1000px) {
      opacity: 0;
    }

    @media (max-width: 1000px) {
      opacity: 1;
    }

    & > img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .slide-in-top {
    animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-1000px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .slide-out-top {
    animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }

  @keyframes slide-out-top {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-1000px);
      opacity: 0;
    }
  }

  // desktop navigation

  @media (max-width: 1000px) {
    .desktop-nav-list {
      opacity: 0;
    }
  }

  .desktop-nav-list {
    display: flex;
    justify-content: center;
    align-items: end;
    gap: 3rem;
    margin-right: 4rem;
    list-style: none;
    overflow: hidden;

    // @media (max-width: 1000px) {
    //   display: none;
    // }

    &-link {
      text-decoration: none;
      color: var(--color-neutral-900);
      transition-property: color;
      transition-duration: 250ms;
      font-size: 1.188rem;
      font-family: var(--ff-primary);
      font-weight: var(--semi-bold);

      &:hover {
        color: var(--color-accent);
      }
    }

    &-item {
      display: flex;
      text-align: left;
      flex-direction: column;
      align-items: start;
    }
  }

  .desktop-item-counter {
    font-size: 1.188rem;
    opacity: 0.7;
    font-family: var(--ff-primary);
    color: var(--color-accent);
  }

  .scroll-change-visible {
    opacity: 1;
  }

  .scroll-change-hidden {
    opacity: 0;
  }

  .rotate-square-clock {
    transform: rotate(90deg);
    transition: transform 350ms ease;
  }

  .rotate-square-counterClock {
    transform: rotate(-90deg);
    transition: transform 350ms ease;
  }
</style>
