import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSlice";
export function Login() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    (() => {
      if (loginForm.email && loginForm.password !== "") {
        dispatch(loginUser(loginForm));
      }
    })();
  }, [loginForm.email, loginForm.password]);

  const loginHandler = () => {
    setLoginForm((form) => ({
      ...form,
      email: "madhusudan@gmail.com",
      password: "madhusudan123",
    }));
  };

  useEffect(() => token && navigate("/"), [token]);

  return (
    <div className="flex flex-col justify-center w-full h-screen px-4 py-6 text-gray-800 auth-container sm:py-12 sm:h-full">
      <div className="w-2/5 py-3 mx-auto text-center sm:max-w-xl sm:w-11/12">
        <div className="mt-4 text-left bg-white shadow-md sm:rounded-lg">
          <div className="h-2 bg-rose-500 rounded-t-md"></div>
          <div className="flex flex-col items-center justify-center pt-2 my-2">
            <div className="flex items-center justify-center pt-2 md:hidden">
              <h1 className="ml-2 text-4xl font-bold text-rose-400 title">
                Samvaad
              </h1>
            </div>
            <p className="mt-2 ml-2 font-bold text-rose-300 title text-md">
              Connect, Explore, Transcend.
            </p>
          </div>
          <div className="px-12 py-4 pb-8 sm:px-6 sm:pt-0 sm:py-3">
            <span className="flex justify-center pb-2 text-2xl font-semibold border-b-2 border-rose-400 sm:text-xl">
              Sign In
            </span>
            <div className="pt-8">
              <label className="block font-semibold">Username or Email</label>
              <input
                type="text"
                placeholder="Email"
                className="w-full h-5 px-3 py-5 mt-2 border rounded-md hover:outline-none focus:outline-none focus:ring-1 focus:ring-rose-400 sm:py-4"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                required
              />
              <label className="block mt-3 font-semibold">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full h-5 px-3 py-5 mt-2 border rounded-md hover:outline-none focus:outline-none focus:ring-1 focus:ring-rose-400 sm:py-4 sm:mt-1"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                required
              />
              <div>
                <button
                  className="w-full px-6 py-2 my-6 font-semibold text-white rounded-lg bg-rose-400 hover:bg-rose-500 sm:py-1"
                  onClick={() => loginHandler()}
                >
                  Sign In With Test
                </button>
              </div>
              <div className="font-semibold text-center">
                <Link to="/sign-up">
                  <p className="cursor-pointer hover:underline">
                    Create New Account
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
