/* Fetching Data From API */

let pokeOffset = '0';
let pokeLimit = '100';

const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pokeOffset}&limit=${pokeLimit}`);
const pokemonArr = [];
 
class pokeAttributes {
  constructor(data) {
    this.image = data.sprites.other.dream_world.front_default;
    this.name = data.name;
    this.abilities = data.abilities;
    this.types = data.types;
  }
}

async function fetchAllPokemon(fetcher) {
  fetcher 
  .then(response => response.json())
  .then(data => {
    for (const pokemon in data.results) {
      fetchOnePokemon(data.results[pokemon].url, pokemon, data.results)
    }
  })
  .catch(console.error);
}

async function fetchOnePokemon(url, pokemon, dataResults) {
  const response = await fetch(url);
  const data = await response.json();
  pokemonInfo = new pokeAttributes(data);
  pokemonArr.push(pokemonInfo);
  if ((dataResults.length * 1) - 1 === (pokemon * 1)) {
    console.log(pokemonArr);
    buildingPokemonCards();
    counterBuilder(collectionId ,counterCollectionId);
    counterBuilder(favoriteId, counterFavoritesId);
    const likeButtonSelector = document.querySelectorAll('.like-button-container');
    const unlikeButtonSelector = document.querySelectorAll('.unlike-button-container');
    cardRemoverAdder(likeButtonSelector, favoriteId);
    cardRemoverAdder(unlikeButtonSelector, collectionId);
    alphabetical(buttonArrCollection, cardCollectionAll, zToAOne);
    alphabetical(buttonArrFavorite, cardCollectionFav, zToATwo);
  }
}

fetchAllPokemon(pokemon);

/* Building Pokemon Cards */

const cardCollectionAll = document.getElementById('collection');
const cardCollectionFav = document.getElementById('favorite');

const cardClass = 'card';
const pokeTypeContainerClass = 'poke-type-container'
const pokeTypeClass = 'poke-type'
const likeButtonClass = 'like-button-container';
const unlikeButtonClass = 'unlike-button-container';
const farClass = 'far';
const faThumbsUpClass = 'fa-thumbs-up';
const faThumbsDownClass = 'fa-thumbs-down';
const cardImageContainerClass = 'card-image-container';
const outerAbilitiesClass = 'outer-abilities-container';
const innerAbilitiesClass = 'inner-abilities-container';

const dataName = 'data-name';
const dataPokeType = 'data-type';

function buildingPokemonCards() {
  for (const attribute of pokemonArr) {
    const {image, name, abilities, types} = attribute;

    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add(cardClass);
    pokemonCard.setAttribute(dataName, name);

    const pokeTypeContainer = document.createElement('div');
    pokeTypeContainer.classList.add(pokeTypeContainerClass)

    for (const object of types) {
      const {slot, type} = object;
      const {name, url} = type;

      const pokeType = document.createElement('div');
      pokeType.classList.add(pokeTypeClass);
      pokeType.setAttribute(dataPokeType, name);
      pokeType.textContent = name;

      pokeTypeContainer.appendChild(pokeType);
    }



    const pokemonName = document.createElement('h3');
    pokemonName.textContent = name[0].toUpperCase().concat(name.slice(1, name.length));

    const likeButtonContainer = document.createElement('div');
    likeButtonContainer.classList.add(likeButtonClass);

    const likeClass = document.createElement('i');
    likeClass.classList.add(farClass);
    likeClass.classList.add(faThumbsUpClass);

    const unlikeButtonContainer = document.createElement('div');
    unlikeButtonContainer.classList.add(unlikeButtonClass);

    const unlikeClass = document.createElement('i');
    unlikeClass.classList.add(farClass);
    unlikeClass.classList.add(faThumbsDownClass);

    const cardImageContainer = document.createElement('div');
    cardImageContainer.classList.add(cardImageContainerClass);

    const cardImage = document.createElement('img');
    cardImage.setAttribute('src', image);

    const outerAbilitiesContainer = document.createElement('div');
    outerAbilitiesContainer.classList.add(outerAbilitiesClass);

    const abilityHeader = document.createElement('h4');
    abilityHeader.textContent = 'Abilities';

    const innerAbilitiesContainer = document.createElement('div');
    innerAbilitiesContainer.classList.add(innerAbilitiesClass);

    cardCollectionAll.appendChild(pokemonCard);
    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokeTypeContainer);
    pokemonCard.appendChild(likeButtonContainer);
    likeButtonContainer.appendChild(likeClass);
    pokemonCard.appendChild(unlikeButtonContainer);
    unlikeButtonContainer.appendChild(unlikeClass);
    pokemonCard.appendChild(cardImageContainer);
    cardImageContainer.appendChild(cardImage);
    pokemonCard.appendChild(outerAbilitiesContainer);
    outerAbilitiesContainer.appendChild(abilityHeader);
    outerAbilitiesContainer.appendChild(innerAbilitiesContainer);
    for (const ability of abilities) {
      const {...oneAbility} = ability;
      const abilityName = oneAbility.ability.name;

      const printAbility = document.createElement('p');
      printAbility.textContent = abilityName;

      innerAbilitiesContainer.appendChild(printAbility);
    }
  }
}

/* Add and Remove From Favorites */

const favoriteId = 'favorite';
const collectionId = 'collection';

function cardRemoverAdder(buttonSelector, id) {
  for (const elm of buttonSelector) {
    elm.addEventListener('click', function() {
      const parent = this.parentElement
      this.parentElement.remove();
      this.remove();
      document.getElementById(id).appendChild(parent).appendChild(this);
      counterBuilder(collectionId ,counterCollectionId);
      counterBuilder(favoriteId, counterFavoritesId);
    })
  }
}

/* Pokemon Type Counter */

let pokeTypeArray = [];

const counterCollectionId = 'counterContainerCollection';
const counterFavoritesId = 'counterContainerFavorites';

const typeContainerClass = 'type-container';

function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

function counterBuilder(collectionId ,counterId) {
  const counterCollection = document.getElementById(counterId);
  removeAllChildren(counterCollection);
  pokeTypeArray = [];
  const getPokeTypes = document.getElementById(collectionId)
  .getElementsByClassName(pokeTypeClass);
  for (const pokeType of getPokeTypes) {
    pokeTypeArray.push(pokeType.dataset.type);
  }
  const countEachType = pokeTypeArray.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
  }, {});
  for (const [key, value] of Object.entries(countEachType)) {
    console.log(`These are the ${collectionId} types: ${key} ${value}`);
    const typeContainer = document.createElement('div');
    typeContainer.classList.add(typeContainerClass);

    const typeHeader = document.createElement('h4');
    typeHeader.textContent = key;

    const count = document.createElement('div');
    count.textContent = value;

    counterCollection.appendChild(typeContainer);
    typeContainer.appendChild(typeHeader);
    typeContainer.appendChild(count);
  }
}

/* Alphabetize */

const zToAOne = 'z-a-one';
const zToATwo = 'z-a-two';

const sortContainerButtons = 'sortContainerButtons';
const sortFavButtons = 'sortFavButtons';

let buttonArrCollection = [];
let buttonArrFavorite = [];
let sortedCardsByName = [];
let alphabetized = [];


buttonSelector(sortContainerButtons, buttonArrCollection);
buttonSelector(sortFavButtons, buttonArrFavorite);

function buttonSelector(id, buttonPusher) {
  const idSelector = document.getElementById(id);
  const buttons = idSelector.children;
  for (const button of buttons) {
    buttonPusher.push(button);
  }
}

function alphabetical(buttonSelector, cardContainer, dataValue) {
  for (const buttons of buttonSelector) {
    buttons.addEventListener('click', function() {
      const buttonValue = buttons.dataset.sort;
      const cards = cardContainer.getElementsByClassName(cardClass);
      sortedCardsByName = [];
      alphabetized = [];
      for (const card of cards) {
        sortedCardsByName.push(card.dataset.name);
        sortedCardsByName.sort();
        for (const name of sortedCardsByName) {
          const arrangeAttribute = cardContainer
          .querySelectorAll(`[data-name="${name}"]`);
          alphabetized.push(arrangeAttribute);
        }
      }
      const alphabetizedNodes = alphabetized.slice(-sortedCardsByName.length);
      let alphabetizedArray = [];
      let reversedAlphabetizedArray = [];
      for (const node of alphabetizedNodes) {
        for (const div of node) {
          alphabetizedArray.push(div);
        }
      }
      console.log(alphabetizedArray);
      removeAllChildren(cardContainer);
      if (buttonValue !== dataValue) {
        console.log('a-z');
        for (const card of alphabetizedArray) {
          cardContainer.appendChild(card);
        }
      } else {
        console.log('z-a');
        for (let i = alphabetizedArray.length; i > 0; i--) {
          reversedAlphabetizedArray.push(alphabetizedArray[i - 1]);
          for (const card of reversedAlphabetizedArray) {
            cardContainer.appendChild(card);
          }
        }
      }
    })
  }
}