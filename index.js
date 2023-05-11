import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
var page = 1;
let searchQuery = "";

// Getting the cardObject
let characterObject = await fetchCharacters(page);
var maxPage = characterObject.info.pages;

async function fetchCharacters(page) {
  try {
    const result = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    const data = await result.json();
    cardContainer.innerHTML = "";
    maxPage = data.info.pages;

    for (let i = 0; i < data.results.length; i++) {
      cardContainer.append(createCharacterCard(data.results[i]));
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
fetchCharacters(1);

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page = page + 1;
    fetchCharacters(page);
    pagination.innerText = `${page} / ${maxPage}`;
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
    fetchCharacters(page);
    pagination.innerText = `${page} / ${maxPage}`;
  }
});

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  searchQuery = event.target.firstElementChild.value;
  await fetchCharacters();
  page = 1;
  pagination.innerText = `${page} / ${maxPage}`;
  searchBar.firstElementChild.value = "";
});

// searchBar.addEventListener("input", (event) => {
//   event.preventDefault();
//   searchQuery = event.target.value;
//   fetchCharacters();
//   pagination.innerText = `Characters with ${searchQuery} in name`;
//   searchQuery = "";
// });
