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

const contactForm = document.querySelector("#search-form");
contactForm.addEventListener("click", (event) => {
  event.preventDefault();
});

getShows();
getSingleShow();
init();
