import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSSmappen/ListPokemons.css";
import { useNavigate } from "react-router-dom";

const FavorietPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Hier wordt de useEffect gedefinieerd die de favorieten ophaalt uit de localStorage(deze blijft staan ook als je het afsluit of refresh) en deze opslaat in de state favoritePokemons.
  // De gegevens worden opgehaald van de API en opgeslagen in de state favoritePokemons met een id, naam en types.
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
    // Dan wordt de lijst van favoriete Pokémon weergegeven met hun afbeelding, naam en types.
    // Als er geen favoriete Pokémon zijn, wordt er een bericht weergegeven dat er nog geen favoriete Pokémon zijn toegevoegd.
    // Als je er op klikt, ga je naar de Pokedex-pagina van die Pokémon met alle details over de pokemon.
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
