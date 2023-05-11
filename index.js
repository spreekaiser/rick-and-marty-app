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

// Getting the cardObject
const characterObject = await fetchCharacters();
console.log(characterObject);

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

// console.log(createCharacterCard(characterObject.results[12]));

async function fetchCharacters() {
  const result = await fetch("https://rickandmortyapi.com/api/character");
  const data = await result.json();
  return data;
}

function getCharacterCard() {
  cardContainer.innerHTML = "";
  for (let i = 0; i < characterObject.results.length; i++) {
    cardContainer.append(createCharacterCard(characterObject.results[i]));
  }
  console.log(cardContainer);
}

getCharacterCard();
