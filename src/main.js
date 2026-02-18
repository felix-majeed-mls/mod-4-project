import { getShows } from "./fetch-helpers.js";
import { getSingleShow } from "./fetch-helpers.js";
import { init } from "./app.js";

getShows();
getSingleShow();
init();
console.log(getShows());
console.log(getSingleShow());
