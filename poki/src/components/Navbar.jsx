import React from "react";
import { NavLink } from "react-router-dom";

import logo from '../assets/images/pokiballs.png';

const Navbar = () => {
  return (
    <>
      <nav className="bg-yellow-400 border-b border-yellow-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <NavLink
                className="flex flex-shrink-0 items-center mr-4"
                to="/"
              >
                <img
                  className="h-10 w-auto"
                  src={logo}
                  alt="React Jobs"
                />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  Pokimon {/* Home */}
                </span>
              </NavLink>
              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <NavLink
                    to="/"
                    className="text-white bg-red-500 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/favorite"
                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Favorite {/*jobs */}
                  </NavLink>
                  <NavLink
                    to="/poke"
                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Pokimons {/*jobs */}
                  </NavLink> 
                  <NavLink
                    to="/pokedex"
                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Pokidex {/* Add Job */}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
