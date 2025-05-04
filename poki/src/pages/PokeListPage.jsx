import React, { useState, useEffect } from "react";
import "../components/ListPokemons.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PokeListPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1302"
        );
        const results = res.data.results;

        const pokemonDetails = await Promise.all(
          results.map(async (pokemon) => {
            const pokeData = await axios.get(pokemon.url);
            return {
              id: pokeData.data.id,
              name: pokeData.data.name,
              types: pokeData.data.types,
            };
          })
        );

        setPokemonList(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  const handlePokemonClick = (pokemon) => {
    navigate(`/pokedex/${pokemon.name}`);
  };

  const toggleFavorite = (pokemonId) => {
    let updatedFavorites;
    if (favorites.includes(pokemonId)) {
      updatedFavorites = favorites.filter((id) => id !== pokemonId);
    } else {
      updatedFavorites = [...favorites, pokemonId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toUpperCase().includes(searchTerm.toUpperCase())
  );

  if (loading) return <p>Loading Pokémon...</p>;

  return (
    <div>
      <h1>Pokémon Lijst</h1>
      <input
        type="text"
        placeholder="Zoek Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}
      />

      <div className="pokemon-list">
        {filteredPokemonList.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            {/* ❤️ Hartje rechtsboven */}
            <button
              className="favorite-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(pokemon.id);
              }}
            >
              {favorites.includes(pokemon.id) ? "❤️" : "🤍"}
            </button>

            <div onClick={() => handlePokemonClick(pokemon)}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <div className="pokemon-types">
                {pokemon.types && pokemon.types.length > 0 ? (
                  pokemon.types.map((typeInfo, index) => (
                    <span
                      key={index}
                      className={`type-badge ${typeInfo.type.name}`}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))
                ) : (
                  <span className="type-badge normal">Unknown</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeListPage;
