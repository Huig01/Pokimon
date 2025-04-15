import React, { useState, useEffect } from "react";
import axios from "axios";
import "./components/App.css";

import Navbar from "./components/Navbar";
import Trainer from "./components/Trainer";
import HomeCards from "./components/HomeCards";
import PokimonList from "./components/PokimonList";
import PokemonDetails from "./components/PokimonDetails";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1302")
      .then((res) => {
        setPokemonList(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon list:", error);
      });
  }, []);

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toUpperCase().includes(searchTerm.toUpperCase())
  );

  const showPokemon = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch Pokémon details");
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Trainer />
      <HomeCards />

      {/* Search Bar */}
      <div className="search-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Selected Pokémon Details */}
      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}

      {/* Pokémon List */}
      <PokimonList pokemon={filteredPokemonList} onPokemonClick={showPokemon} />
    </>
  );
};

export default App;