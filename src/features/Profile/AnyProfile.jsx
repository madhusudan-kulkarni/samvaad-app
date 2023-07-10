import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "../../components";
import { getUserPost } from "../Home/postSlice";
import { SinglePost } from "../Home/SinglePost";
import { closeLoader, openLoader } from "./profileModalSlice";
import { followUnFollowUser } from "./userSlice.js";

export function AnyProfile() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const [singleUser, setSingleUser] = useState({});
  const { userPosts, allPosts } = useSelector((state) => state.post);
  const { loader } = useSelector((state) => state.profileModal);

  useEffect(() => {
    setSingleUser(allUsers.find((user) => user.userHandler === userId));
  }, [allUsers, userId]);

  useEffect(() => {
    dispatch(openLoader());
    setTimeout(() => dispatch(closeLoader()), 500);
  }, [userId]);

  useEffect(() => {
    dispatch(getUserPost(singleUser?.username));
  }, [singleUser, allPosts]);

  const isFollowing = singleUser?.followers?.some(
    (anyUser) => anyUser.username === user.username
  );

  return singleUser?.username ? (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-start gap-4 p-4 mt-4 mb-8 bg-white profile-input rounded-xl sm:gap-2 ">
            <img
              src={singleUser.profilePic}
              className="object-cover w-20 h-20 rounded-full"
            />
            <div className="grow">
              <div className="flex justify-between mb-2">
                <div>
                  <p className="mr-2 text-xl font-bold cursor-pointer">{`${singleUser.firstName} ${singleUser.lastName}`}</p>
                  <p className="text-sm text-gray-400 cursor-pointer">
                    @{singleUser.userHandler}
                  </p>
                </div>
                <button
                  className="px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out rounded-full shadow-md bg-rose-500 hover:bg-rose-600"
                  onClick={() =>
                    dispatch(
                      followUnFollowUser({
                        userId: singleUser._id,
                        dispatch: dispatch,
                        isFollow: isFollowing ? false : true,
                      })
                    )
                  }
                >
                  {!isFollowing ? "Follow" : "Unfollow"}
                </button>
              </div>
              <p className="mb-2 font-semibold text-gray-500">
                {singleUser.bio}
              </p>
              <div className="flex gap-8 mb-2 font-semibold text-gray-500 sm:gap-0 sm:justify-between">
                <span>{userPosts.length} Posts</span>
                <span>{singleUser.followers.length} Followers</span>
                <span>{singleUser.following.length} Following</span>
              </div>
              <div className="flex gap-4 text-xs font-semibold text-gray-500">
                <div>
                  <a
                    href={singleUser.link}
                    className="text-rose-500 hover:underline decoration-1"
                    target="_blank"
                  >
                    {singleUser.link}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:mb-14 sm:mb-8">
            {userPosts.length > 0 ? (
              userPosts.map((post) => <SinglePost key={post._id} post={post} />)
            ) : (
              <div className="m-auto my-4 text-xl font-bold text-gray-500 sm:mb-8">
                <p className="text-center">No Posts Yet</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  ) : (
    <></>
  );
}
