import React, { useState } from 'react';
import Pokemon from './components/Pokemon';
import RickAndMorty from './components/RickandMorty';
import StarWars from './components/StarWars';
import './App.css';

const App = () => {
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const addSelectedCharacter = (character) => {
    if (selectedCharacters.length < 3) {
      setSelectedCharacters([...selectedCharacters, character]);
      if (selectedCharacters.length === 2) {
        alert('¡Felicitaciones! Ya has seleccionado los 3 personajes.');
      }
    } else {
      alert('Solo puedes seleccionar 3 personajes.');
    }
  };

  const handlePlayAgain = () => {
    setSelectedCharacters([]);
    window.location.reload();
  };

  return (
    <div className="App">
      <header>
        <h1>¿Qué personaje eres según tu número favorito?</h1>
        <p>Este es un juego interesante en el que digitarás con dos personas más cuál es tu número favorito. Dependiendo del número, el juego te asignará un personaje. Puedes seleccionar el personaje o tienes la opción de digitar más números. Las reglas son seleccionar un personaje por cada persona. ¡A jugar!</p>
      </header>
      <div className="search-containers">
        <Pokemon addSelectedCharacter={addSelectedCharacter} />
        <RickAndMorty addSelectedCharacter={addSelectedCharacter} />
        <StarWars addSelectedCharacter={addSelectedCharacter} />
      </div>
      <div className="selected-characters">
        <h2>Personajes Seleccionados</h2>
        <div className="character-cards">
          {selectedCharacters.map((character, index) => (
            <div key={index} className="character-card">
              <img src={character.imageUrl} alt={character.name} />
              <p><strong>{character.name}</strong></p>
              <p>{character.description}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        className="play-again-button"
        onClick={handlePlayAgain}
        disabled={selectedCharacters.length < 3}
      >
        Jugar de nuevo
      </button>
    </div>
  );
};

export default App;
