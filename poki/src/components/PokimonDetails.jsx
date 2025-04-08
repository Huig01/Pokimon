import React from "react";

const PokemonDetails = ({ pokemon }) => {
  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      {pokemon.stats.map((stat, i) => (
        <p key={i}>{stat.stat.name}: {stat.base_stat}</p>
      ))}
    </div>
  );
};

export default PokemonDetails;