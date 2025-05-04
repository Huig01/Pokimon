import React, { useEffect, useState } from "react";
import "../components/Stats.css";
import { useParams } from "react-router-dom"; // om de naam uit de URL te halen

const PokedexPage = () => {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemon();
  }, [name]);

  if (!pokemonData) return <p>Loading...</p>;

  return (
    <div className="pokedex-page">
      <h1>{pokemonData.name}</h1>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p>Height: {(pokemonData.height / 10).toLocaleString("nl-NL", { minimumFractionDigits: 1 })} m</p>
      <p>Weight: {(pokemonData.weight / 10).toLocaleString("nl-NL", { minimumFractionDigits: 1 })} kg</p>

      <div className="stats">
        {pokemonData.stats.map((stat) => (
          <div key={stat.stat.name} className="stat-item">
            <div className="stat-name">
              {stat.stat.name.replace("-", " ")}: {stat.base_stat}
            </div>
            <div className="stat-bar-background">
              <div
                className="stat-bar-fill"
                style={{ width: `${(stat.base_stat / 150) * 100}%` }} // max 150, schaal zelf aan
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Voeg nog meer details toe als je wilt */}
    </div>
  );
};

export default PokedexPage;
