import React from "react";

const PokemonDetails = ({ pokemon }) => {
  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {(pokemonData.height / 10).toLocaleString("nl-NL", { minimumFractionDigits: 1 })} m</p>
      <p>Weight: {(pokemonData.weight / 10).toLocaleString("nl-NL", { minimumFractionDigits: 1 })} kg</p>
      {pokemon.stats.map((stat, i) => (
        <p key={i}>{stat.stat.name}: {stat.base_stat}</p>
      ))}
    </div>
  );
};

export default PokemonDetails;