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
let page = 1;
const searchQuery = "";

// Getting the cardObject
let characterObject = await fetchCharacters(page);
const maxPage = characterObject.info.pages;

console.log(characterObject);

// console.log(createCharacterCard(characterObject.results[12]));

async function fetchCharacters(page) {
  const result = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await result.json();
  cardContainer.innerHTML = "";
  for (let i = 0; i < data.results.length; i++) {
    cardContainer.append(createCharacterCard(data.results[i]));
  }
  return data;
}
console.log(maxPage);

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
