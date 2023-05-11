export function createCharacterCard(api) {
  const liCard = document.createElement("li");
  liCard.classList.add("card");
  liCard.innerHTML = `<div class="card__image-container">
            <img
              class="card__image"
              src="${api.image}"
              alt="Rick Sanchez"
            />
            <div class="card__image-gradient"></div>
          </div>
          <div class="card__content">
            <h2 class="card__title">${api.name}</h2>
            <dl class="card__info">
              <dt class="card__info-title">Status</dt>
              <dd class="card__info-description">${api.status}</dd>
              <dt class="card__info-title">Type</dt>
              <dd class="card__info-description">${api.type}</dd>
              <dt class="card__info-title">Occurrences</dt>
              <dd class="card__info-description">${api.episode.length}</dd>
            </dl>
          </div>`;

  return liCard;
}
