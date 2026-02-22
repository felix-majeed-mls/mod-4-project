import { getShows, getSingleShow } from "./fetch-helpers.js";
import { toggleFavorites, getFavorites } from "./storage-helpers.js";

export const renderCollection = (shows, ulSelector) => {
  const ul = document.querySelector(ulSelector);
  ul.replaceChildren();
  shows.forEach((show) => {
    const li = document.createElement("li");
    li.dataset.id = show.id;
    const showName = document.createElement("h3");
    const img = document.createElement("img");
    const rating = document.createElement("p");

    showName.textContent = `${show.name}`;
    img.src = show.image?.medium || "placeholder-url-here";
    img.alt = `Show poster ${show.name}`;
    rating.textContent = `Rating: ${show.rating.average || "N/A"}`;

    li.append(showName, img, rating);
    ul.append(li);
  });
};

export const renderShowDetails = (show) => {
  const detailsSection = document.querySelector("#show-details");
  detailsSection.classList.remove("hidden");

  const showName = document.querySelector("#show-name");
  const showImage = document.querySelector("#show-image");
  const showGenre = document.querySelector("#show-genre");
  const showAiringDates = document.querySelector("#show-airingdates");
  const showRating = document.querySelector("#show-rating");
  const showSummary = document.querySelector("#show-summary");
  const favoritesButton = document.querySelector("#favorites-button");

  showName.textContent = show.name;
  showImage.src = show.image?.medium || "https://via.placeholder.com";
  showImage.alt = show.name;
  showGenre.textContent = show.genres.join(", ");
  showAiringDates.textContent = `Premiered: ${show.premiered}, Ended: ${show.ended}`;
  showRating.textContent = `Rating: ${show.rating.average || "N/A"}`;

  const cleanSummary = show.summary
    ? show.summary.replace(/<[^>]*>/g, "")
    : "No summary available";
  showSummary.textContent = cleanSummary;

  //Checks if show is already favorited
  const favorites = getFavorites();
  const isFavorited = favorites.includes(show.id.toString());

  favoritesButton.textContent = isFavorited
    ? "💜 In favorites"
    : "❤️ Add to favorites";

  // Remove old listener first tto prevent double click bugs
  favoritesButton.onclick = () => {
    const updatedFavs = toggleFavorites(show.id.toString());
    const nowFavorited = updatedFavs.includes(show.id.toString());
    favoritesButton.textContent = nowFavorited
      ? "💜 In favorites"
      : "❤️ Add to favorites";
  };
};

export const renderFavorites = async () => {
  const favoriteIds = getFavorites();
  const arrPromises = favoriteIds.map((id) => getSingleShow(id));
  const shows = await Promise.all(arrPromises);
  console.log(shows);
  renderCollection(shows, "#render-favorites");
};

export const init = async () => {
  const shows = await getShows();
  renderCollection(shows, "#show-list");
  console.log("renderShowDetails called");
};

init();
