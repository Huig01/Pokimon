import React, { useEffect, useState } from "react";
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
    <div>
      <h1>{pokemonData.name}</h1>
      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      {/* Voeg hier meer details toe als je wilt */}
    </div>
  );
};

export default PokedexPage;
