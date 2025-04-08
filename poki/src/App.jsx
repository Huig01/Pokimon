/* import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Trainer from "./components/Trainer";
import HomeCards from "./components/HomeCards";
import PokimonList from "./components/PokimonList";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  useEffect(() => {
    axios.get(currentPageUrl).then((res) => {      
      setPokemon(res.data.results.map((p) => p.name));
    });
  }, [currentPageUrl]);

  return (
    <>
      <Navbar />
      <Trainer />
      <HomeCards />
      <PokimonList pokemon={pokemon} />
    </>
  );
};

export default App;
 */


 
/* import "./components/App.css";

import pokemonData from "./components/pokimonapi.json";

import React, { useState } from "react";



function App() {

  const [pokemonList, setPokemonList] = useState(pokemonData.results);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPokemon, setSelectedPokemon] = useState(null);



  const filteredPokemonList = pokemonList.filter((pokemon) =>

    pokemon.name.includes(searchTerm)

  );



  const showPokemon = async (url) => {

    const response = await fetch(url);

    if (!response.ok) {

      console.error(`Error fetching Pokemon: ${response.statusText}`);

      return;

    }



    const data = await response.json();

    setSelectedPokemon(data);

  };



  return (

    <div className="App">

      <header>

      </header>



      <main>

        <div className="search-container">

          <input className="search-box" type="text" placeholder="Search..."

          value={searchTerm}

          onChange={event => setSearchTerm(event.target.value)}

          />

        </div>



        {selectedPokemon && (

          <div className="pokemon-details">

            <h2>{selectedPokemon.name}</h2>

            <img

              src={selectedPokemon.sprites.front_default}

              alt={selectedPokemon.name}

            />

            <p>Height: {selectedPokemon.height}</p>

            <p>Weight: {selectedPokemon.weight}</p>



            {selectedPokemon.stats.map((stat, index) => (

              <div key={index}>

                <p>

                  {stat.stat.name}: {stat.base_stat}

                </p>

              </div>

            ))}

          </div>

        )}



        <ul>

          {filteredPokemonList.map((pokemon) => (

            <li key={pokemon.id} className="pokemon-item">

              <a href="#" onClick={() => showPokemon(pokemon.url)}>

                {pokemon.name}

              </a>

            </li>

          ))}

        </ul>

      </main>

    </div>

  );

}



export default App; */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./components/App.css";

import Navbar from "./components/Navbar";
import Trainer from "./components/Trainer";
import HomeCards from "./components/HomeCards";
import PokimonList from "./components/PokimonList";
import PokemonDetails from "./components/PokimonDetails";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1302")
      .then((res) => {
        setPokemonList(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon list:", error);
      });
  }, []);

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toUpperCase().includes(searchTerm.toUpperCase())
  );

  const showPokemon = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch Pokémon details");
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Trainer />
      <HomeCards />

      {/* Search Bar */}
      <div className="search-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Selected Pokémon Details */}
      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}

      {/* Pokémon List */}
      <PokimonList pokemon={filteredPokemonList} onPokemonClick={showPokemon} />
    </>
  );
};

export default App;