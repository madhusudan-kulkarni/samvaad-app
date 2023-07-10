import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export function SearchBar() {
  const { allUsers } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  let timerId = useRef();
  useEffect(() => {
    clearTimeout(timerId.current);
    if (input.trim().length > 0)
      timerId.current = setTimeout(() => {
        setData(
          allUsers?.filter((eleUser) =>
            `${eleUser.firstName} ${eleUser.lastName}`
              .toLowerCase()
              .includes(input.toLowerCase())
          )
        );
      }, 500);
  }, [input]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setInput("");
      event.target.blur();
    }
  };

  return (
    <div className="top-0 h-20 bg-neutral-100 sm:flex sm:items-center sm:w-full z-1">
      <div className="w-full py-2 sm:w-11/12">
        <div className="flex items-center px-4 py-2 bg-white border-2 space-between rounded-xl border-rose-400 ">
          <FaSearch
            className="mr-2 cursor-pointer text-rose-500"
            aria-hidden="true"
          />
          <input
            className="grow focus:outline-none sm:text-sm"
            placeholder="Search Samvaad"
            value={input}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        {input.trim().length > 0 && (
          <ul className="absolute z-10 w-5/6 mt-2 overflow-y-auto bg-white border shadow-xl left-12 rounded-xl md:left-8 max-h-40 border-rose-400">
            {data.length > 0 ? (
              data.map((userInfo) => (
                <li
                  key={userInfo._id}
                  className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    user.userHandler === userInfo?.userHandler
                      ? navigate("/profile")
                      : navigate(`/user-profile/${userInfo?.userHandler}`);
                    setInput("");
                  }}
                >
                  <img
                    src={userInfo?.profilePic}
                    className="h-6 rounded-full sm:h-4"
                    alt={userInfo?.userHandler}
                  />
                  <span className="ml-2 mr-1 text-gray-500 grow text-md sm:text-sm ">
                    {`${userInfo?.firstName} ${userInfo?.lastName}`}
                  </span>
                </li>
              ))
            ) : (
              <p className="px-4 py-2 sm:text-sm">No Search found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
