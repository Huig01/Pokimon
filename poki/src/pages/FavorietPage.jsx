import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSSmappen/ListPokemons.css";
import { useNavigate } from "react-router-dom";

const FavorietPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

      try {
        const details = await Promise.all(
          storedFavorites.map(async (id) => {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return {
              id: res.data.id,
              name: res.data.name,
              types: res.data.types,
            };
          })
        );
        setFavoritePokemons(details);
        setLoading(false);
      } catch (err) {
        console.error("Fout bij het ophalen van favorieten:", err);
      }
    };

    fetchFavorites();
  }, []);

  const handlePokemonClick = (pokemon) => {
    navigate(`/pokedex/${pokemon.name}`);
  };

  if (loading) return <p>Favoriete Pokémon laden...</p>;

  return (
    <div>
      <h1>Favoriete Pokémon</h1>
      {favoritePokemons.length === 0 ? (
        <p>Je hebt nog geen favoriete Pokémon toegevoegd.</p>
      ) : (
        <div className="pokemon-list">
          {favoritePokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="pokemon-card"
              onClick={() => handlePokemonClick(pokemon)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <h2 className="pokemon-name">{pokemon.name}</h2>
              <div className="pokemon-types">
                {pokemon.types.map((typeInfo, index) => (
                  <span
                    key={index}
                    className={`type-badge ${typeInfo.type.name}`}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavorietPage;
