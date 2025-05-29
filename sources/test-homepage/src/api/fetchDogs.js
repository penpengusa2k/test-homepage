import axios from 'axios';

const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;
const domain = import.meta.env.VITE_MICROCMS_DOMAIN;

export async function fetchDogs() {
  const url = `https://${domain}.microcms.io/api/v1/dogs`;
  const response = await axios.get(url, {
    headers: { 'X-MICROCMS-API-KEY': apiKey }
  });
  return response.data.contents;
}
