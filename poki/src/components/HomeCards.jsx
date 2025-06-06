import React from "react";
import { Link } from "react-router-dom";

import Card from "./Card";

const HomeCards = () => {
  return (
    <>
      <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <Card>
              <h2 className="text-2xl font-bold">For Trainers{/* For Developers */}</h2>
              <p className="mt-2 mb-4">
                Browse our collection of Pokimons and start your journey{/* Browse our React jobs and start your career today */}
              </p>
              <Link
                to="/poke"
                className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
              >
                Browse Pokimons{/* Browse Jobs */}
              </Link>
            </Card>
            <Card bg ='bg-red-500'>
              <h2 className="text-2xl font-bold text-white">Pokidex{/* For Employers */}</h2>
              <p className="mt-2 mb-4 text-white">
                List of Abilities of all pokimons to find what is perfect for you{/* List your job to find the perfect developer for the role */}
              </p>
              <Link
                to="/pokedex"
                className="inline-block bg-gray-600 text-white rounded-lg px-4 py-2 hover:bg-black"
              >
                Pokidex{/* Add Job */}
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeCards;
