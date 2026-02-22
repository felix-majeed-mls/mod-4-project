import { getShows, getSingleShow, searchShows } from "./fetch-helpers.js";
import {
  renderCollection,
  renderShowDetails,
  renderFavorites,
  init,
} from "./app.js";

const contactForm = document.querySelector("#search-form");
contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const searchTerm = searchInput.value;

  try {
    const searchResults = await searchShows(searchTerm);
    renderCollection(searchResults, "#show-list");
  } catch (error) {
    console.warn("Search failed:", error);
  }

  contactForm.reset();
});

const closeButton = document.querySelector("#close-button");
closeButton.addEventListener("click", () => {
  const detailsSection = document.querySelector("#show-details");
  detailsSection.classList.add("hidden");
});

init();

const showDetails = document.querySelector("#show-details");
showDetails.addEventListener("click", (event) => {
  if (event.target === showDetails) {
    showDetails.classList.add("hidden");
  }
});

const favoritesToggle = document.querySelector("#favorites-toggle");
favoritesToggle.addEventListener("click", async () => {
  const favoritesSection = document.querySelector("#favorites-section");
  if (favoritesSection.classList.contains("hidden")) {
    await renderFavorites();
  }
  favoritesSection.classList.toggle("hidden");
  const collectionSection = document.querySelector("#collection-section");
  collectionSection.classList.toggle("hidden");
});

const handleShowClick = async (event) => {
  const li = event.target.closest("li");
  if (!li || !li.dataset.id) return;
  const id = li.dataset.id;
  try {
    const singleShowResponse = await getSingleShow(id);
    console.log(singleShowResponse);
    renderShowDetails(singleShowResponse);
  } catch (error) {
    console.warn(error);
  }
};

const showList = document.querySelector("#show-list");
const favoriteList = document.querySelector("#render-favorites");

showList.addEventListener("click", handleShowClick);
favoriteList.addEventListener("click", handleShowClick);
