import axios from 'axios';

const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;
const domain = import.meta.env.VITE_MICROCMS_DOMAIN;

export async function fetchDogs() {
  const url = `https://${domain}.microcms.io/api/v1/dogs`;
  const response = await axios.get(url, {
    headers: { 'X-MICROCMS-API-KEY': apiKey }
  });

  const dogs = response.data.contents.map(dog => ({
    id: dog.id,
    name: dog.name,
    images: dog.images,
    breed: dog.breed,
    age: dog.age,
    gender: dog.gender?.[0] || '',
    status: dog.status?.[0] || '',
    weight: dog.weight,
    character: dog.character,
    health: dog.health,
    rescueDate: dog.rescueDate,
    birthday: dog.birthday,
  }));

  return dogs;
}

export async function fetchDogById(id) {
  const url = `https://${domain}.microcms.io/api/v1/dogs/${id}`;
  const response = await axios.get(url, {
    headers: { 'X-MICROCMS-API-KEY': apiKey }
  });

  const dog = response.data;

  return {
    id: dog.id,
    name: dog.name,
    images: dog.images,
    breed: dog.breed,
    age: dog.age,
    gender: dog.gender?.[0] || '',
    status: dog.status?.[0] || '',
    weight: dog.weight,
    character: dog.character,
    health: dog.health,
    rescueDate: dog.rescueDate,
    birthday: dog.birthday,
  };
}

