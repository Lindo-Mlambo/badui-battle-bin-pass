const $ = (q, selectAll = true) =>
  selectAll ? document.querySelectorAll(q) : document.querySelector(q);

window.onload = () => {
  console.log("ready...");
};
