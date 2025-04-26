import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // voor navigeren
import axios from "axios";

const PokeListPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const handlePokemonClick = (pokemon) => {
    navigate(`/pokedex/${pokemon.name}`); // ga naar PokedexPage met naam
  };

  return (
    <div>
      <h1>Pokémon Lijst</h1>
      <input
        type="text"
        placeholder="Zoek Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredPokemonList.map((pokemon) => (
          <li
            key={pokemon.name}
            onClick={() => handlePokemonClick(pokemon)}
            style={{ cursor: "pointer", margin: "5px 0" }}
          >
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokeListPage;
