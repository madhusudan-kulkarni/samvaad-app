import { useDispatch, useSelector } from "react-redux";
import { SinglePost } from "./SinglePost";
import { openPostModal } from "./Modal/postModalSlice";
import { getUserPost } from "./postSlice";
import { useEffect, useState } from "react";
import { Loader } from "../../components";
import { closeLoader, openLoader } from "../Profile/profileModalSlice";
import { FaPlusCircle, FaUserCircle } from "react-icons/fa";

export function Home() {
  const { allPosts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { loader } = useSelector((state) => state.profileModal);
  const dispatch = useDispatch();
  const [feedPost, setFeedPost] = useState([]);
  const [trendPost, setTrendPost] = useState({ isTrend: false, posts: [] });
  const [activeButton, setActiveButton] = useState("latest");

  useEffect(() => {
    if (allPosts) {
      setFeedPost(
        allPosts
          ?.filter(
            (post) =>
              post?.username === user?.username ||
              user?.following?.find((ele) => post?.username === ele?.username)
          )
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
  }, [user, allPosts]);

  useEffect(() => {
    dispatch(getUserPost(user.username));
  }, [allPosts]);

  useEffect(() => {
    dispatch(openLoader());
    setTimeout(() => dispatch(closeLoader()), 1000);
  }, []);

  const trendingHandler = () => {
    dispatch(openLoader());
    setTrendPost((prev) => ({ ...prev, isTrend: true }));
    setTrendPost((prev) => ({
      ...prev,
      posts: [...feedPost]
        ?.sort((a, b) => b.likes.likeCount - a.likes.likeCount)
        ?.filter((post) => post.likes.likeCount > 0),
    }));
    dispatch(closeLoader());
  };

  const latestHandler = () => {
    setTrendPost((prev) => ({ ...prev, isTrend: false }));
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="flex w-3/4 overflow-hidden bg-white shadow-lg rounded-xl">
          <button
            className={`w-1/2 px-4 py-2 font-semibold text-gray-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              activeButton === "latest"
                ? "bg-rose-600 text-white"
                : "hover:bg-rose-400 hover:text-white"
            }`}
            onClick={() => {
              latestHandler();
              setActiveButton("latest");
            }}
          >
            Latest Posts
          </button>
          <button
            className={`w-1/2 px-4 py-2 font-semibold text-gray-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
              activeButton === "trending"
                ? "bg-rose-600 text-white"
                : "hover:bg-rose-400 hover:text-white"
            }`}
            onClick={() => {
              trendingHandler();
              setActiveButton("trending");
            }}
          >
            Trending
          </button>
        </div>
      </div>

      {loader ? (
        <Loader />
      ) : trendPost.isTrend ? (
        <div className="flex flex-col gap-6 md:mb-14 sm:mb-8">
          {trendPost.posts.length !== 0 ? (
            [...trendPost.posts].map((post) => (
              <SinglePost key={post._id} post={post} />
            ))
          ) : (
            <div className="m-auto mt-16 text-xl font-bold text-gray-500">
              <p className="text-center">
                Like more posts to see what's trending
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6 md:mb-14 sm:mb-8">
          {feedPost.length !== 0 ? (
            feedPost.map((post) => <SinglePost key={post._id} post={post} />)
          ) : (
            <></>
          )}
          <div className="m-auto my-4 text-xl font-bold text-gray-500 sm:mb-8">
            <p className="text-center">
              Follow users to add to get their updates in your feed
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
