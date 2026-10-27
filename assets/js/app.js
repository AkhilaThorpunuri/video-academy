import { loadVideoCatalog } from "./github-service.js";
import { playVideo } from "./video-player.js";

const categoryList = document.querySelector("#category-list");
const videoList = document.querySelector("#video-list");
const playerContainer = document.querySelector("#player-container");
const videoTitle = document.querySelector("#video-title");
const videoDescription = document.querySelector("#video-description");

async function initializeAcademy() {
  try {
    const catalog = await loadVideoCatalog();

    categoryList.replaceChildren();
    videoList.replaceChildren();

    catalog.categories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category.title;

      button.addEventListener("click", () => {
        showCategory(category);
      });

      categoryList.appendChild(button);
    });

    if (catalog.categories.length > 0) {
      showCategory(catalog.categories[0]);
    }
  } catch (error) {
    console.error(error);
    categoryList.textContent =
      "Unable to load videos. Please try again later.";
  }
}

function showCategory(category) {
  videoList.replaceChildren();

  [...category.videos]
    .sort((a, b) => a.order - b.order)
    .forEach((video) => {
      const button = document.createElement("button");
      button.textContent = video.title;

      button.addEventListener("click", () => {
        try {
          playVideo(video, playerContainer);
          videoTitle.textContent = video.title;
          videoDescription.textContent = video.description;
        } catch (error) {
          console.error(error);
          videoList.textContent = "Unable to load this video.";
        }
      });

      videoList.appendChild(button);
    });
}

initializeAcademy();