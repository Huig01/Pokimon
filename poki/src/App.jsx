import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Trainer from "./components/Trainer";
import HomeCards from "./components/HomeCards";
import PokimonList from "./components/PokimonList";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  useEffect(() => {
    axios.get(currentPageUrl).then((res) => {
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
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
