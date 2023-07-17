<template>
  <footer class="footer" id="contact">
    <div class="container">
      <div class="footer-content">
        <div data-aos="fade-left" class="title">
          <h2>Contact us</h2>
          <p>fill in your request and let us switch your digital experiences.</p>
        </div>
        <div data-aos="fade-right" class="contact-form">
          <form>
            <label for="first-name">First Name:</label>
            <input placeholder="First Name" required type="text" id="first-name" />
            <label for="last-name">Last Name:</label>
            <input placeholder="Last Name" required type="text" id="last-name" />

            <label for="email">E-mail:</label>
            <input placeholder="E-mail" required type="text" id="email" />

            <label for="phone">Phone</label>
            <input placeholder="Phone" type="tel" id="phone" />

            <textarea
              name="message"
              id="message"
              cols="30"
              rows="5"
              placeholder="Briefly tell us about your project and your current goals. 
How can we help you?"
              required
              maxlength="300">
            </textarea>

            <input type="submit" value="send message" class="submit-btn" />
          </form>
        </div>
      </div>
      <div data-aos="fade-up" class="socials">
        <div class="social-media">
          <NuxtLink to="https://www.linkedin.com/company/theswitch-company/" target="_blank">
            <img src="../assets/images/linkedin-icon.svg" alt="linkedin icon" width="100" height="100" />
          </NuxtLink>
          <NuxtLink to="https://www.behance.net/florena-ciril" target="_blank">
            <img src="../assets/images/behance-icon.svg" alt="behance icon" width="100" height="100" />
          </NuxtLink>
          <NuxtLink to="https://www.facebook.com/people/The-Switch-Company/100067696236599/" target="_blank">
            <img src="../assets/images/facebook-icon.svg" alt="facebook-icon" width="100" height="100" />
          </NuxtLink>
          <NuxtLink to="https://www.instagram.com/theswitch.company/" target="_blank"> <img src="../assets/images/instagram-icon.svg" alt="instagram icon" width="100" height="100" /></NuxtLink>
        </div>
        <div class="flex">
          <div class="tel-email">
            <p class="number">+40 774 536 776</p>
            <hr />
            <p class="email">office@switch.company</p>
          </div>
          <div class="location">
            <LocationPin />
            <p class="city">Cluj, Transylvania</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  footer {
    min-height: 100vh;
    background-image: url("../assets/images/bg-map.webp");
    background-repeat: no-repeat;
    background-size: cover;
    padding-inline: 1rem;
    margin-block-start: 5rem;

    @media (min-width: 1000px) {
      background-position-x: 0;
      background-attachment: fixed;
      background-position-y: -20rem;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .footer-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: center;
        align-items: center;

        @media (min-width: 1000px) {
          flex-direction: row;
          align-items: start;
        }

        .title {
          h2 {
            font-size: var(--step-section-titles);
            font-family: var(--ff-secondary);
            font-weight: var(--bold);
            color: var(--color-neutral-900);
            margin-block-end: 0.5rem;
          }

          p {
            color: var(--color-accent);
            font-family: var(--ff-primary);
            font-size: var(--step-paragraps);
            text-align: left;
            margin-inline-start: 1.5rem;
          }
        }

        .contact-form {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          padding-left: 2rem;

          @media (min-width: 760px) {
            grid-template-columns: repeat(1, 1fr);
            place-items: center;
          }

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

            @media (min-width: 760px) {
              margin-inline-start: 1.5rem;
            }
          }

          textarea {
            background-color: var(--color-neutral-100);
            border: 0;
            border-bottom: 1px solid var(--color-neutral-900);
            color: var(--color-neutral-900);
            font-size: var(--step-paragraps);

            &:focus {
              outline: 0;
              border-color: var(--color-accent);
            }
          }
        }
      }
    }

    .socials {
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      overflow: hidden;
      font-family: var(--ff-primary);
      font-size: var(--step-paragraps);
      padding-left: 2rem;

      @media (min-width: 760px) {
        flex-direction: row;
        justify-content: center;
        align-items: end;
        padding-bottom: 2rem;
      }

      .social-media {
        display: flex;
        align-items: end;
        justify-content: space-evenly;
        min-height: 40vh;
        padding-bottom: 2rem;
        margin-inline-start: -2.5rem;

        @media (min-width: 760px) {
          justify-content: space-between;
          align-items: end;
          gap: 2rem;
          margin-inline-end: 2rem;
        }

        @media (min-width: 1000px) {
          gap: 5rem;
          justify-content: center;
        }

        img {
          width: 24px;
          height: 24px;
          transform: scale(5);
        }
      }

      .tel-email {
        position: relative;
        display: flex;
        flex-direction: column;
        @media (min-width: 760px) {
          padding-inline-start: 2rem;
        }

        hr {
          width: 100%;
          position: absolute;
          transform: rotate(90deg);
          top: 100%;
          left: -55%;

          @media (min-width: 760px) {
            left: -50%;
          }
        }

        .number {
          margin-block: 1rem;
        }
      }

      .flex {
        display: flex;
        align-items: start;
        justify-content: space-between;
        flex-direction: column;
        gap: 1rem;

        @media (min-width: 760px) {
          flex-direction: row;
          align-items: end;
          justify-content: space-between;
          gap: 0;
        }
      }

      .location {
        display: flex;
        gap: 0.5rem;

        @media (min-width: 760px) {
          margin-inline-start: 1rem;
        }

        @media (min-width: 1000px) {
          margin-inline-start: 5rem;
        }
      }
    }
  }
</style>
