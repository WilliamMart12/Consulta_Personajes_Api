const express = require('express');
const axios = require('axios');
const cors = require('cors');

app.use(cors({
    origin: 'https://consulta-personajes-api-84nh.onrender.com', // Cambia esto a la URL de tu frontend
}));

// const mongoose = require('mongoose'); // Comentar la importación de mongoose

const app = express();
const PORT = process.env.PORT || 3000;
// const MONGODB_URI = ''; //Colocar tu configuración para mongodb

app.use(express.json());

// Deshabilitar la conexión a MongoDB
// mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 30000 })
//   .then(() => console.log('Conectado a MongoDB'))
//   .catch(err => console.error('Error al conectar a MongoDB:', err));

// Comentar el esquema y modelo de User
// const userSchema = new mongoose.Schema({
//   apiId: { type: String, required: true },
//   name: { type: String, required: true },
//   description: { type: String },
//   imageUrl: { type: String },
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

app.get('/api/pokemon/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = response.data;

    const speciesResponse = await axios.get(pokemon.species.url);
    const descriptionEntry = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'en');
    const description = descriptionEntry ? descriptionEntry.flavor_text : "No description available";

    res.json({ name: pokemon.name, description: description, imageUrl: pokemon.sprites.front_default });
  } catch (error) {
    console.error('Error al consultar PokeAPI:', error.message);
    res.status(500).send('Error al consultar PokeAPI: ' + error.message);
  }
});

app.get('/api/rickandmorty/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    const character = response.data;

    res.json({ name: character.name, description: character.status, imageUrl: character.image });
  } catch (error) {
    console.error('Error al consultar The Rick and Morty API:', error.message);
    res.status(500).send('Error al consultar The Rick and Morty API: ' + error.message);
  }
});

app.get('/api/starwars/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    const person = response.data;
    const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

    res.json({ name: person.name, description: `Height: ${person.height}, Mass: ${person.mass}, Gender: ${person.gender}`, imageUrl: imageUrl });
  } catch (error) {
    console.error('Error al consultar The Star Wars API:', error.message);
    res.status(500).send('Error al consultar The Star Wars API: ' + error.message);
  }
});

// Rutas que dependen de MongoDB ahora están deshabilitadas
// app.post('/api/select/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, imageUrl } = req.body;

//     if (!name || !description || !imageUrl) {
//       return res.status(400).send('Missing required fields: name, description, imageUrl');
//     }

//     const existingUser = await User.findOne({ apiId: id });
//     if (!existingUser) {
//       const newUser = new User({
//         apiId: id,
//         name,
//         description,
//         imageUrl
//       });
//       await newUser.save();
//     }

//     res.json({ message: 'Character selected and saved.' });
//   } catch (error) {
//     console.error('Error al guardar el personaje:', error.message);
//     res.status(500).send('Error al guardar el personaje: ' + error.message);
//   }
// });

// app.post('/api/clear', async (req, res) => {
//   try {
//     await User.deleteMany({});
//     res.json({ message: 'All records deleted successfully.' });
//   } catch (error) {
//     console.error('Error al limpiar los registros:', error.message);
//     res.status(500).send('Error al limpiar los registros: ' + error.message);
//   }
// });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
