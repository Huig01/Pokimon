import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./CSSmappen/App.css";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import PokeListPage from "./pages/PokeListPage";
import PokedexPage from "./pages/PokedexPage";
import FavorietPage from "./pages/FavorietPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/poke" element={<PokeListPage />} />
      <Route path="/pokedex/:name" element={<PokedexPage />} />
      <Route path="/favorite" element={<FavorietPage />} />
    </Route>
  )
);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
