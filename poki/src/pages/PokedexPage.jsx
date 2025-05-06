import React, { useEffect, useState } from "react";
import "../CSSmappen/Stats.css";
import { useParams } from "react-router-dom"; // om de naam uit de URL te halen

const PokedexPage = () => {
  // Hier wordt de naam van de Pokémon uit de URL gehaald met behulp van useParams.
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
 // deze useEffect wordt de Pokémongegevens gedefinieerd met een useState hook, die de gegevens van de Pokémon opslaat.	
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
    // Hier wordt de Pokémongegevens weergegeven, zoals naam, afbeelding, hoogte, gewicht en stats.
    // De stats worden weergegeven in een balkvorm met een achtergrondkleur en een vulkleur die de waarde van de stat weergeeft.

    // En voor de hoogte en gewicht wordt de waarde gedeeld door 10 om het in meters en kilogrammen weer te geven.
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
