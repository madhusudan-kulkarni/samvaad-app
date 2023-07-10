import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="flex flex-col items-center justify-center max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">
        Welcome to Samvaad
      </h2>
      <p className="mb-8 text-lg text-gray-600">
        Connect with people around the globe. Share your thoughts and stay
        connected with friends.
      </p>
      <Link to="/sign-up" className="w-full">
        <button className="w-full px-4 py-3 mb-4 text-lg text-white transition-colors duration-300 rounded-md shadow-md bg-rose-500 hover:bg-rose-600">
          Join Now
        </button>
      </Link>
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="underline text-rose-500">
          Log in
        </Link>
      </p>
    </div>
  </div>
);

export default Landing;
