import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "./authSlice";
export function SignUp() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpFields = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [signUpForm, setSignUpForm] = useState(signUpFields);

  useEffect(() => token && navigate("/"), [token]);

  const signUpHandler = () => {
    const { email, password, firstName, lastName } = signUpForm;
    if (email && password && firstName && lastName !== "") {
      (async () => {
        await dispatch(signUpUser(signUpForm));
      })();
    }
  };

  const fillFormValue = (event, fieldName) => {
    const { value } = event.target;
    setSignUpForm((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <div className="flex flex-col justify-center w-full h-screen px-4 py-6 mt-4 text-gray-800 auth-container sm:py-12">
      <div className="w-2/5 py-3 mx-auto text-center sm:max-w-xl sm:w-11/12">
        <div className="mt-4 text-left bg-white shadow-md sm:rounded-lg">
          <div className="h-2 bg-rose-500 rounded-t-md"></div>
          <div className="flex flex-col items-center justify-center pt-2 my-2">
            <div className="flex items-center justify-center pt-2 md:hidden">
              <p className="ml-2 text-3xl font-bold text-rose-400 title">
                Samvaad
              </p>
            </div>
            <p className="ml-2 font-bold text-rose-300 title text-md">
              Connect, Explore, Transcend.
            </p>
          </div>
          <div className="px-12 py-4 pb-8 sm:px-6 sm:pt-0 sm:py-3 ">
            <span className="flex justify-center pb-2 text-2xl font-semibold border-b-2 border-rose-400 sm:text-xl">
              Sign Up
            </span>
            <div className="pt-8">
              <div className="flex gap-4 mb-4 sm:flex-col sm:gap-2 sm:mb-2">
                <div>
                  <label className="block font-semibold">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full h-5 px-3 py-5 mt-2 border rounded-md hover:outline-none focus:outline-none focus:ring-1 focus:ring-rose-400 sm:py-4"
                    value={signUpForm.firstName}
                    onChange={(e) => fillFormValue(e, "firstName")}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full h-5 px-3 py-5 mt-2 border rounded-md hover:outline-none focus:outline-none focus:ring-1 focus:ring-rose-400 sm:py-4"
                    value={signUpForm.lastName}
                    onChange={(e) => fillFormValue(e, "lastName")}
                    required
                  />
                </div>
              </div>
              <label className="block font-semibold">Username or Email</label>
              <input
                type="text"
                placeholder="Email"
                className="w-full h-5 px-3 py-5 mt-2 border rounded-md hover:outline-none focus:outline-none focus:ring-1 focus:ring-rose-400 sm:py-4"
                value={signUpForm.email}
                onChange={(e) => fillFormValue(e, "email")}
                required
              />
              <label className="block mt-3 font-semibold sm:mt-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full h-5 px-3 py-5 mt-2 border rounded-md hover:outline-none focus:outline-none focus:ring-1 focus:ring-rose-400 sm:py-4"
                value={signUpForm.password}
                onChange={(e) => fillFormValue(e, "password")}
                required
              />
              <div>
                <button
                  className="w-full px-6 py-2 my-6 font-semibold text-white rounded-lg bg-rose-400 hover:bg-rose-500 sm:py-1"
                  onClick={() => signUpHandler()}
                >
                  Create Account
                </button>
              </div>
              <div className="font-semibold text-center">
                <Link to="/login">
                  <p className="cursor-pointer hover:underline">
                    Already Have An Account ?
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
