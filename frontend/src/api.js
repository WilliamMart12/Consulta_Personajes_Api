// frontend/src/api.js

import axios from 'axios';

const API_URL = 'https://consulta-personajes-api.onrender.com/api'; // URL de tu backend en Render

export const getPokemon = async () => {
  return await axios.get(`${API_URL}/pokemon`);
};

export const getRickAndMorty = async () => {
  return await axios.get(`${API_URL}/rickandmorty`);
};

export const getStarWars = async () => {
  return await axios.get(`${API_URL}/starwars`);
};

export const getPokemonById = async (id) => {
  return await axios.get(`${API_URL}/pokemon/${id}`);
};

export const getRickAndMortyById = async (id) => {
  return await axios.get(`${API_URL}/rickandmorty/${id}`);
};

export const getStarWarsById = async (id) => {
  return await axios.get(`${API_URL}/starwars/${id}`);
};

export const selectCharacter = async (id, characterData) => {
  return await axios.post(`${API_URL}/select/${id}`, characterData);
};

export const clearDatabase = async () => {
  return await axios.post(`${API_URL}/clear`);
};
