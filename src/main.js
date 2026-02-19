import { getShows, getSingleShow } from "./fetch-helpers.js";
import { renderCollection, renderShowDetails, init } from "./app.js";

const showList = document.querySelector("#show-list");

showList.addEventListener("click", async (event) => {
  const li = event.target.closest("li");
  if (!li) return;

  const id = li.dataset.id;
  try {
    const singleShowResponse = await getSingleShow(id);
    console.log(singleShowResponse);
    renderShowDetails(singleShowResponse);
  } catch (error) {
    console.warn(error);
  }
});
const contactForm = document.querySelector('#search-form')
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const searchInput = document.querySelector('#search-input')
  const searchTerm = searchInput.value

  try {
    const searchResults = await getShows(searchTerm);
    renderCollection(searchResults);
  } catch (error) {
    console.warn("Search failed:", error);
  }

  contactForm.reset()
})

init();
