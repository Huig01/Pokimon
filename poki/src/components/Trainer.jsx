import React from "react";

const Trainer = ({ title = 'Become a Pokimon Trainer', subtitle = 'Find a Pokimon that fits your skills'}) => {
  return (
    <>
      <section className="bg-yellow-400 py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              {title} {/*  Become a React Dev */}
            </h1>
            <p className="my-4 text-xl text-white">
             {subtitle} {/* Find the React job that fits your skills and needs */}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Trainer;
