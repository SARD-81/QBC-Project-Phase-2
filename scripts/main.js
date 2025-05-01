const $ = document;
const date = new Date();
/* set the current date */
$.querySelector("#date").innerHTML = `امروز، ${date.toLocaleString("fa-IR", {
  dateStyle: "medium",
})}`;
