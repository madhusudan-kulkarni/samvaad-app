import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components";
import { updateUser } from "../Authentication/authSlice";
import { getUserPost } from "../Home/postSlice";
import { SinglePost } from "../Home/SinglePost";
import { closeLoader, openLoader, openModal } from "./profileModalSlice";

export function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const { userPosts, allPosts } = useSelector((state) => state.post);
  const { loader } = useSelector((state) => state.profileModal);

  useEffect(() => {
    dispatch(getUserPost(user.username));
  }, [allPosts]);

  useEffect(() => {
    dispatch(openLoader());
    setTimeout(() => dispatch(closeLoader()), 1000);
  }, []);

  useEffect(() => {
    dispatch(updateUser(user.username));
  }, [allUsers]);

  return (
    <div>
      <div
        className="profile-input bg-white
        flex items-start p-4 rounded-xl gap-4 my-6 sm:gap-2"
      >
        <img
          src={user.profilePic}
          className="h-20 w-20 rounded-full object-cover sm:h-16 sm:w-16"
        />
        <div className="grow">
          <div className="flex justify-between mb-2">
            <div>
              <p className="text-xl font-bold mr-2 cursor-pointer break-all">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-sm text-gray-400 cursor-pointer break-all">
                @{user.userHandler}
              </p>
            </div>
            <button
              className="px-2 py-1 rounded-md font-semibold text-gray-500 hover:bg-gray-100  ring-1 ring-gray-500 ring-inset self-start"
              onClick={() => dispatch(openModal())}
            >
              Edit
            </button>
          </div>
          <p className="text-gray-500 font-semibold mb-2 break-all">
            {user.bio}
          </p>
          <div className="flex text-gray-500 font-semibold gap-8 mb-2 sm:gap-2 sm:justify-between">
            <span>{userPosts.length} Posts</span>
            <span>{user.followers.length} Followers</span>
            <span>{user.following.length} Following</span>
          </div>
          <div className="text-sm font-semibold flex gap-4">
            <div>
              <a
                href={user.link}
                className="text-rose-400 hover:underline decoration-1 break-all"
                target="_blank"
              >
                {user.link}
              </a>
            </div>
          </div>
        </div>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-6 md:mb-14 sm:mb-8">
          {userPosts.length > 0 ? (
            userPosts.map((post) => <SinglePost key={post._id} post={post} />)
          ) : (
            <div className="text-xl m-auto text-gray-500 font-bold my-4 sm:mb-8">
              <p className="text-center">No Posts Yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
