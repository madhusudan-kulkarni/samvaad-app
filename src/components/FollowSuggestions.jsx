import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUnFollowUser } from "../features/Profile/userSlice";

export function FollowSuggestions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    if (user && Array.isArray(allUsers)) {
      const newSuggestions = allUsers
        .filter((ele) => ele.username !== user.username)
        .filter(
          (ele) =>
            Array.isArray(user.following) &&
            !user.following.find((ele2) => ele2._id === ele._id)
        )
        .slice(0, 3);
      setSuggestion(newSuggestions);
    }
  }, [user, allUsers]);

  return allUsers.length > 0 ? (
    <div className="follow-container w-[33%] ml-8 p-4 bg-white border-2 rounded-2xl h-max sticky top-10 md:hidden">
      <p className="pb-4 text-lg font-semibold text-center">Who to follow</p>
      {suggestion.length > 0 ? (
        suggestion.map((suggestUser) => (
          <div
            key={suggestUser._id}
            className="flex py-4 border-t-2 border-gray-300 border-solid"
          >
            <img
              src={suggestUser.profilePic}
              className="self-center object-cover w-8 h-8 mr-2 rounded-full cursor-pointer"
              onClick={() =>
                navigate(`/user-profile/${suggestUser?.userHandler}`)
              }
            />

            <div className="flex justify-between ml-1 grow lg:flex-col ">
              <div
                className="cursor-pointer"
                onClick={() =>
                  navigate(`/user-profile/${suggestUser?.userHandler}`)
                }
              >
                <p className="font-semibold cursor-pointer">{`${suggestUser.firstName} ${suggestUser.lastName}`}</p>
                <p className="text-gray-400 text-s ">
                  {suggestUser.userHandler}
                </p>
              </div>
              <div className="items-center lg:mt-2">
                <button
                  className="px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out rounded-full shadow-md bg-rose-500 hover:bg-rose-600"
                  onClick={() =>
                    dispatch(
                      followUnFollowUser({
                        userId: suggestUser._id,
                        dispatch: dispatch,
                        isFollow: true,
                      })
                    )
                  }
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-4 border-t-2 border-gray-300 border-solid">
          <p className="font-semibold text-center">No Suggestions</p>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}
