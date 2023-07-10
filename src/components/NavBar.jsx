import React from "react";
import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <div className="top-0 z-20 hidden w-full px-3 py-1 bg-neutral-50 md:block">
      <NavLink to="/">
        <div className="flex items-center justify-center ">
          <p className="ml-4 text-3xl font-bold text-rose-500 title sm:ml-2">
            Samvaad
          </p>
        </div>
      </NavLink>
    </div>
  );
}
