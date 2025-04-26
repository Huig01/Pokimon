import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./components/App.css";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  )
);
const App = () => {
  /* const [pokemonList, setPokemonList] = useState([]);
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
  }; */

  return <RouterProvider router={router} />;
};

export default App;
