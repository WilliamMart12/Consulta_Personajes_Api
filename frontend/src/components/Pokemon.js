import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getPokemonById } from '../api';

const Pokemon = ({ addSelectedCharacter }) => {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    const response = await getPokemonById(searchId);
    setSearchResult(response.data);
  };

  const handleSelect = () => {
    const { name, description, imageUrl } = searchResult;
    addSelectedCharacter({ name, description, imageUrl });
    setSearchResult({ ...searchResult, selected: true });
  };

  return (
    <div className="search-section">
      <h1>Pokémon</h1>
      <input
        type="number"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Enter Pokémon ID"
        disabled={searchResult && searchResult.selected}
      />
      <button onClick={handleSearch} disabled={searchResult && searchResult.selected}>
        Search
      </button>
      {searchResult && (
        <motion.div
          className="result-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p>Result: {searchResult.name}</p>
          <p>Description: {searchResult.description}</p>
          <img src={searchResult.imageUrl} alt={searchResult.name} />
          {searchResult.selected ? (
            <p>Este personaje ha sido seleccionado.</p>
          ) : (
            <button onClick={handleSelect}>Select</button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Pokemon;
