<script setup lang="ts">
  import data from "../../db/posts.json";

  const route = useRoute();
  const routeParam = route.params.post;

  const [filteredData] = data.posts.filter((post) => {
    return post.postId === routeParam;
  });
</script>

<template>
  <div class="post">
    <div class="post-header">
      <h1 v-if="filteredData.postArticleTitle" class="post-title">
        <span v-if="filteredData.postArticleTitle.whiteText" class="white">
          {{ filteredData.postArticleTitle.whiteText }}
        </span>
        <span class="blue"> {{ filteredData.postArticleTitle.blueText[0] }}</span>
        <span class="effect" :data-effect="filteredData.postArticleTitle.textWithEffect"> {{ filteredData.postArticleTitle.textWithEffect }}</span>
        <span class="blue">{{ filteredData.postArticleTitle.blueText[1] }}</span>
      </h1>
    </div>
    <div class="post-body">
      <div class="flex">
        <div class="date">
          <span class="date-nr">{{ filteredData.postDate.day }}</span>
          <hr />
          <span class="date-month-year">{{ filteredData.postDate.month }} {{ filteredData.postDate.year }}</span>
        </div>
        <div class="domains">
          <ul class="domains-list">
            <li class="domains-list-item" v-for="(domain, i) in filteredData.postDomain" :key="i">{{ domain }}</li>
          </ul>
        </div>
      </div>

      <div class="post-body-content">
        <div class="articles">
          <div class="article">
            <h2 class="article-title">{{ filteredData.postArticle1.title }}</h2>
            <p class="article-text" v-for="(p, i) in filteredData.postArticle1.paragraphs" :key="i">
              {{ p }}
            </p>
            <h2 class="article-title">{{ filteredData.postArticle2.title }}</h2>
            <div class="subarticles" v-for="(subArt, i) in filteredData.postArticle2.subarticles" :key="i">
              <h2 class="subarticles-title" :data-title-effect="subArt?.title" :data-title-nr="subArt?.nr">{{ subArt?.title }}</h2>
              <p class="subarticles-text" v-for="(subArtPara, i) in subArt?.paragraphs" :key="i">
                {{ subArtPara }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="filteredData.quote" class="quote">
          <p class="quote-title">{{ filteredData.quote }}</p>
        </div>
        <div class="post-last">
          <h2 class="article-title">{{ filteredData.postArticle3?.title }}</h2>
          <p class="article-text" v-for="(p, i) in filteredData.postArticle3?.paragraphs" :key="i">
            {{ p }}
          </p>
        </div>
      </div>
    </div>
    <div class="back">
      <NuxtLink class="back-btn" to="/blog"><Arrow class="rotate" /> Back</NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .post {
    background-color: #f2f2f2;
    color: var(--color-neutral-100);

    &-header {
      min-height: 50vh;
      display: flex;
      align-items: end;
      background-image: url("/blog-1-bg.webp");
      background-size: cover;

      .post-title {
        color: var(--color-neutral-900);
        font-family: var(--ff-secondary);
        font-size: var(--step-section-titles);
        font-weight: bold;
        display: flex;
        flex-direction: column;

        @media (min-width: 450px) {
          width: 100%;
        }

        @media (min-width: 760px) {
          gap: 0.5rem;
          padding: 1rem;
        }

        .blue {
          color: var(--color-accent);
        }

        .effect {
          position: relative;
          isolation: isolate;

          &::before {
            content: attr(data-effect);
            position: absolute;
            top: 3%;
            left: 2%;
            z-index: -1;
            color: var(--color-neutral-100);
            text-shadow: -1px -1px 0 var(--color-accent), 1px -1px 0 var(--color-accent), -1px 1px 0 var(--color-accent), 1px 1px 0 var(--color-accent);
            transform: translateZ(-1px);

            @media (min-width: 760px) {
              left: 1%;
            }

            @media (min-width: 1000px) {
              left: 0.5%;
            }
          }
        }
      }
    }

    &-body {
      display: flex;
      padding: 0.5rem 1rem;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        gap: 5rem;
      }

      @media (min-width: 1400px) {
        gap: 15rem;
      }

      .date {
        white-space: nowrap;
        margin: 2rem 0;

        &-nr {
          font-family: var(--ff-secondary);
          font-size: var(--step-section-subtitles);
          font-weight: bold;
        }

        hr {
          width: 5%;
          margin: 0;
        }

        &-month-year {
          font-family: var(--ff-secondary);
          font-size: var(--step-nav-counter);
          font-weight: bold;
        }
      }

      .domains-list {
        margin: 1rem 0;

        .domains-list-item {
          margin: 0.3rem 0;
          font-family: var(--ff-secondary);
          font-size: var(--step-nav-counter);
          color: var(--color-accent);
          font-weight: bold;
        }
      }

      .article {
        &-title {
          font-family: var(--ff-primary);
          font-size: var(--step-section-subtitles);
          font-weight: 700;
          font-style: italic;
          margin-top: 10rem;
        }

        &-text {
          font-family: var(--ff-primary);
          font-size: var(--step-paragraps);
          font-weight: 600;
          margin-block: 2rem;
          line-height: 1.2;
          max-width: 45ch;
        }
      }

      .subarticles {
        @media (min-width: 768px) {
          margin-block: 5rem;
        }
        .subarticle-nr {
          font-family: var(--ff-secondary);
          font-size: var(--step-section-subtitles);
        }

        .subarticles-title {
          font-family: var(--ff-secondary);
          font-size: var(--step-section-subtitles);
          font-weight: bold;
          position: relative;
          isolation: isolate;
          margin-block: 2rem;

          &::before {
            content: attr(data-title-nr);
            position: absolute;
            color: var(--color-accent);
            font-size: var(--step-big-numbers);
            opacity: 0.3;
            top: -15px;
            z-index: -1;
            @media (min-width: 768px) {
              top: -30px;
            }

            @media (min-width: 1400px) {
              top: -50px;
            }
          }

          &::after {
            content: attr(data-title-effect);
            position: absolute;
            top: 2%;
            left: 0.6%;
            z-index: -1;
            color: var(--color-neutral-900);
            text-shadow: -1px -1px 0 var(--color-accent), 1px -1px 0 var(--color-accent), -1px 1px 0 var(--color-accent), 1px 1px 0 var(--color-accent);
            transform: translateZ(-1px);

            @media (min-width: 768px) {
              left: 0.3%;
            }

            @media (min-width: 1400px) {
              top: 3%;
              left: 0.3%;
            }
          }
        }
        &-text {
          font-family: var(--ff-primary);
          font-size: var(--step-paragraps);
          margin-block: 2rem;
          font-weight: 600;
          line-height: 1.2;
          max-width: 45ch;

          @media (min-width: 768px) {
            margin-block: 4rem;
          }
        }
      }

      .quote {
        margin-block: 4rem;
        border-top: 1px solid var(--color-neutral-100);
        border-bottom: 1px solid var(--color-neutral-100);
        padding-block: 1rem;
        width: 100%;

        @media (min-width: 1000px) {
          width: 80%;
        }

        @media (min-width: 1400px) {
          width: 70%;
        }

        &-title {
          font-family: var(--ff-primary);
          font-size: var(--step-section-subtitles);
          text-align: center;
          font-weight: bold;
        }
      }
    }

    .back {
      padding: 1rem;
      position: sticky;
      bottom: 0;

      @media (max-width: 760px) {
        position: static;
      }
      .back-btn {
        font-family: var(--ff-primary);
        font-size: var(--step-btn-text);
        color: var(--color-neutral-100);
        text-decoration: none;

        font-weight: bold;

        &:hover {
          cursor: pointer;
          border-bottom: 2px solid var(--color-neutral-100);
        }

        .rotate {
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
