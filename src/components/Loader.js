import React from "react";
import loaderGif from "../assets/loader.svg";
export function Loader() {
  return (
    <div className="flex items-center justify-center w-2/4  mx-auto h-[calc(80%-8.9rem)]  md:w-full md:mx-4">
      <img src={loaderGif} className="loader"></img>
    </div>
  );
}
