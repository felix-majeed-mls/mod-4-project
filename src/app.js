import { getShows } from "./fetch-helpers.js";
import { toggleFavorites, getFavorites } from "./storage-helpers.js";

export const renderCollection = (shows) => {
  const ul = document.querySelector("#show-list");
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

  showName.textContent = show.name;
  showImage.src = show.image?.medium || "placeholder-url-here";
  showImage.alt = show.name;
  showGenre.textContent = show.genres.join(", ");
  showAiringDates.textContent = `Premiered: ${show.premiered}, Ended: ${show.ended}`;
  showRating.textContent = `Rating: ${show.rating.average || "N/A"}`;

  const stripHtml = (htmlString) => {
    //Create a parser instance and parse the string into a temporary HTML document
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');

    //Return only the plain text content (or a fallback)
    return doc.body.textContent || "No summary available";
  };
  showSummary.textContent = stripHtml(show.summary);

  const favoritesButton = document.querySelector('#favorites-button');

  const favorites = getFavorites();
  const isFavorited = favorites.includes(show.id.toString());
  favoritesButton.textContent = isFavorited ? "💜 Saved" : "❤️ Favorite";

  favoritesButton.onclick = () => {
    const updated = toggleFavorites(show.id.toString());
    const nowFav = updated.includes(show.id.toString());
    favoritesButton.textContent = nowFav ? "💜 Saved" : "❤️ Favorite";
  }
};

export const init = async () => {
  const shows = await getShows();
  renderCollection(shows);
  console.log("renderShowDetails called");
};
