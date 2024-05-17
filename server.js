const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://William12:3219705394@cluster0.jtafcau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Reemplaza con tu URI de conexión a MongoDB

app.use(express.json());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

const userSchema = new mongoose.Schema({
  apiId: { type: String, required: true },
  name: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

app.get('/api/pokemon', async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/5');
    const pokemon = response.data;

    const existingUser = await User.findOne({ apiId: pokemon.id.toString(), name: pokemon.name });
    if (!existingUser) {
      const newUser = new User({
        apiId: pokemon.id.toString(),
        name: pokemon.name
      });
      await newUser.save();
    }

    res.json(await User.find());
  } catch (error) {
    res.status(500).send('Error al consultar PokeAPI: ' + error.message);
  }
});

app.get('/api/rickandmorty', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character/1'); // Consultar el personaje con ID 1
    const character = response.data;

    const existingUser = await User.findOne({ apiId: character.id.toString(), name: character.name });
    if (!existingUser) {
      const newUser = new User({
        apiId: character.id.toString(),
        name: character.name
      });
      await newUser.save();
    }

    res.json(await User.find());
  } catch (error) {
    res.status(500).send('Error al consultar The Rick and Morty API: ' + error.message);
  }
});

app.get('/api/starwars', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/people/4/');
    const person = response.data;

    const apiId = person.url.match(/\/(\d+)\/$/)[1];
    const existingUser = await User.findOne({ apiId: apiId, name: person.name });
    if (!existingUser) {
      const newUser = new User({
        apiId: apiId,
        name: person.name
      });
      await newUser.save();
    }

    res.json(await User.find());
  } catch (error) {
    res.status(500).send('Error al consultar The Star Wars API: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
