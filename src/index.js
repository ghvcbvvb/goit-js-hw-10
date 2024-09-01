import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

init();

async function init() {
  try {
    toggleLoader(true);
    const breeds = await fetchBreeds();
    populateBreedSelect(breeds);
    new SlimSelect({ select: breedSelect });
    toggleLoader(false);
  } catch (err) {
    handleError(err);
  }
}

function populateBreedSelect(breeds) {
  const options = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
  breedSelect.innerHTML = options;
  breedSelect.addEventListener('change', handleBreedSelect);
}

async function handleBreedSelect(event) {
  const breedId = event.target.value;
  if (!breedId) return;

  try {
    toggleLoader(true);
    catInfo.innerHTML = '';
    const catData = await fetchCatByBreed(breedId);
    displayCatInfo(catData);
    toggleLoader(false);
  } catch (err) {
    handleError(err);
  }
}

function displayCatInfo(catData) {
  const { url, breeds } = catData;
  const breedInfo = breeds[0];

  catInfo.innerHTML = `
    <img src="${url}" alt="${breedInfo.name}">
    <h2>${breedInfo.name}</h2>
    <p><strong>Description:</strong> ${breedInfo.description}</p>
    <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
  `;
}

function toggleLoader(isLoading) {
  loader.style.display = isLoading ? 'block' : 'none';
  breedSelect.style.display = isLoading ? 'none' : 'block';
  catInfo.style.display = isLoading ? 'none' : 'block';
}

function handleError(err) {
  toggleLoader(false);
  error.style.display = 'block';
  Notiflix.Notify.failure('Oops! Something went wrong!');
  console.error(err);
}
