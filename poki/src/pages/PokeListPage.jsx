import React, { useState, useEffect } from "react";
import "../CSSmappen/ListPokemons.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PokeListPage = () => {

  // Hier worden de states gedefinieerd voor de Pokémonlijst, zoekterm, laadtoestand en favorieten. als leege array.
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const navigate = useNavigate();
  // Hier wordt de Pokémonlijst opgehaald van de API door de useEffect hook.
  // met een useEffect hook die alleen bij de eerste render wordt uitgevoerd.
  // daarna doormiddel van een async functie haalt hij alle Pokémon op,
  // en slaat ze op in de state pokemonList. met een id, naam en types.
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
  // Hier wordt de functie gedefinieerd die wordt aangeroepen wanneer een Pokémon wordt aangeklikt zodat het naar een ander pagina gaat zoals de pokedex.
  const handlePokemonClick = (pokemon) => {
    navigate(`/pokedex/${pokemon.name}`);
  };
  // Hier wordt de functie gedefinieerd die de favorieten toggle, als de Pokémon al in de favorieten staat, wordt deze verwijderd, anders wordt deze toegevoegd maar heb de Verwijder knop niet in gedaan.
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
    // Hier wordt de hele pagina opgebouwd met een zoekbalk, en een lijst van Pokémon met hun afbeelding, naam en types.
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
