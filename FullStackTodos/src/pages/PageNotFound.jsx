import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <section className="flex text-white items-center justify-center min-h-screen py-16">
        <div className="text-center max-w-[70rem] w-full px-6">
          <h2 className="text-[18vh] sm:text-[15vh] md:text-[18vh] animate-[fadeIn_1s] bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            404
          </h2>
          <h4 className="text-[2rem] sm:text-[1.5rem] mb-6 uppercase font-semibold">
            Sorry! Page Not Found
          </h4>
          <p className="text-xl sm:text-lg mb-8">
            Oops! It seems like the page you're trying to access doesn't exist.
            If you believe there's an issue, feel free to report it, and we'll
            look into it.
          </p>
          <div className="flex justify-center gap-4">
            <NavLink to="/">
              <button className="inline-block text-blue-500 border-2 border-blue-500 py-2 px-6 rounded-full uppercase transition-all hover:bg-blue-500 hover:text-white text-lg">
                Return Home
              </button>
            </NavLink>
            <NavLink to="/contact">
              <button className="inline-block text-blue-500 border-2 border-blue-500 py-2 px-6 rounded-full uppercase transition-all hover:bg-blue-500 hover:text-white text-lg">
                Report Problem
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default PageNotFound;
