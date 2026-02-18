import { getShows } from "./fetch-helpers.js";
import { getSingleShow } from "./fetch-helpers.js";
import { init } from "./app.js";

const contactForm = document.querySelector('#search-form')
contactForm.addEventListener('click', (event) => {
    event.preventDefault()

})

getShows();
getSingleShow();
init();
console.log(getShows());
console.log(getSingleShow());
