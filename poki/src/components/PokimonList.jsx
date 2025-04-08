/* import React from "react";

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
 */

import React from "react";

const PokimonList = ({ pokemon, onPokemonClick }) => {
  return (
    <ul className="pokemon-list">
      {pokemon.map((p, index) => (
        <li key={index} className="pokemon-item">
          <a href="#" onClick={() => onPokemonClick(p.url)}>
            {p.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default PokimonList;