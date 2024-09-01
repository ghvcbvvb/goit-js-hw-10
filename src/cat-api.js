import axios from 'axios';

const API_KEY = 'live_4ax8CAtwHX0bXHowgTM4CzYdxIF5j5akC53D1PM97OlU7jM3ULQQ1FRKdcuFODvi';
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export async function fetchBreeds() {
  try {
    const response = await axios.get(`${BASE_URL}/breeds`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(`${BASE_URL}/images/search`, {
      params: { breed_ids: breedId }
    });
    return response.data[0];
  } catch (error) {
    throw new Error('Failed to fetch cat by breed');
  }
}
