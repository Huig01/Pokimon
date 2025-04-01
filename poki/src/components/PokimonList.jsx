import React from "react";

const PokimonList = ({ pokemon }) => {
  return (
    <div>
      {pokemon.map((p) => (
        <div key={p}>{p}</div>
      ))}
    </div>
  );
};

export default PokimonList;
