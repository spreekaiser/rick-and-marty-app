console.clear();

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
const headLine = document.querySelector("h1");

// States
var page = 1;
let searchQuery = "";
var data;

// Getting the cardObject
let characterObject = await fetchCharacters(page);
var maxPage = characterObject.info.pages;

async function fetchCharacters(page) {
  try {
    const result = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    data = await result.json();
    if (data.error === "There is nothing here") {
      console.log("[fetch] - There is nothing here");
      const emptyContent = document.createElement("h2");
      if (emptyContent.innerText === "") {
        emptyContent.innerText = `There is no item of ${searchQuery} here`;
        cardContainer.prepend(emptyContent);
      }
    } else {
      console.log("[fetch] - data: ", data);
      cardContainer.innerHTML = "";
      maxPage = data.info.pages;
      console.log("[fetch] - items total: ", data.info.count);
      for (let i = 0; i < data.results.length; i++) {
        cardContainer.append(createCharacterCard(data.results[i]));
      }
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page = page + 1;
    fetchCharacters(page);
    console.log(`[nextClick] - Your are on page: ${page}`);
    pagination.innerText = `${page} / ${maxPage}`;
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
    fetchCharacters(page);
    console.log(`[prevClick] - Your are on page: ${page}`);
    pagination.innerText = `${page} / ${maxPage}`;
  }
});

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.clear();
  console.log("target: ", event.target.firstElementChild.value);
  if (event.target.firstElementChild.value) {
    searchQuery = event.target.firstElementChild.value;
    await fetchCharacters();

    page = 1;
    pagination.innerText = `${page} / ${maxPage}`;
    searchBar.firstElementChild.value = "";

    console.log("[submit] - Searching Content: ", searchQuery);
    console.log(`[submit] - total items of ${searchQuery}: `, data.info.count);
  } else {
    console.log("[submit] - no items founded");
  }
});

// searchBar.addEventListener("input", (event) => {
//   event.preventDefault();
//   searchQuery = event.target.value;
//   fetchCharacters();
//   pagination.innerText = `${page} / ${maxPage}`;

//   console.log("[input] - Searching Content: ", searchQuery);
//   console.log(`[input] - total items of ${searchQuery}: `, data.info.count);
// });
