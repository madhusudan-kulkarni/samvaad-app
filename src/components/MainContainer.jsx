import React from "react";
import { FollowSuggestions, SideBar } from "./index";
import { SearchBar } from "./SearchBar";

export function MainContainer({ children }) {
  return (
    <div className="flex my-4 bg-neutral-100">
      <SideBar />
      <div className="relative w-2/4 md:w-full md:mx-4">
        <SearchBar />
        <div className="mt-1">{children}</div>
      </div>
      <FollowSuggestions />
    </div>
  );
}
