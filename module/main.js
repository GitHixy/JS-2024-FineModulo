import { fetchAndDisplayItems } from "./fetch.js";

const init = () => {
    fetchAndDisplayItems();
}
document.addEventListener('DOMContentLoaded', init);