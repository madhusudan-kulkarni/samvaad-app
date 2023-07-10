import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Comment } from "./Comment";
import {
  FaEllipsisV,
  FaEdit,
  FaRegTrashAlt,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { openPostModal } from "./Modal/postModalSlice";
import {
  addAndRemoveBookmark,
  addComment,
  deleteUserPost,
  likeAndDislikePost,
} from "./postSlice";

export function SinglePost({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const [viewAll, setViewAll] = useState(2);
  const {
    _id,
    content,
    username,
    likes: { likeCount, likedBy, dislikedBy },
    bookmark,
    comments,
    createdAt,
  } = post;

  const userInfo =
    allUsers && allUsers?.find((user) => user.username === username);
  const isLiked = likedBy?.some((like) => like.username === user.username);
  const isBookmarked = bookmark?.some(
    (bookmarkPost) => bookmarkPost.username === user.username
  );

  const editHandler = () => {
    dispatch(openPostModal(post));
  };

  const likeDislikeHandler = () => {
    dispatch(
      likeAndDislikePost({ postId: _id, isLike: isLiked ? false : true })
    );
  };

  const postHandler = () => {
    viewAll > 2 && setViewAll((prev) => prev + 1);
    dispatch(addComment({ postId: _id, commentData: comment }));
    setComment("");
  };

  const addRemoveBookmarkHandler = () => {
    dispatch(
      addAndRemoveBookmark({
        postId: _id,
        isBookmark: isBookmarked ? false : true,
      })
    );
  };

  const date = new Date(createdAt);
  const [month, day, year, hour, minutes] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
  ];

  function formatTime(time) {
    return time.toString().padStart(2, "0");
  }

  const formattedMonth = +month + 1;
  const formattedHour = formatTime(hour);
  const formattedMinutes = formatTime(minutes);
  const period = hour >= 12 ? "pm" : "am";

  const formattedDateTime = `${year}/${formattedMonth}/${day} ${formattedHour}:${formattedMinutes} ${period}`;

  return userInfo ? (
    <div className="flex flex-col p-4 bg-white rounded-xl">
      <div className="flex sm:items-center">
        <img
          src={
            user.userHandler === userInfo?.userHandler
              ? user.profilePic
              : userInfo?.profilePic
          }
          className="object-cover w-12 h-12 rounded-full sm:h-8 sm:w-8"
          alt={userInfo?.userHandler}
        />
        <div className="flex items-center justify-between w-full mb-2">
          <div
            onClick={() =>
              user.userHandler === userInfo?.userHandler
                ? navigate("/profile")
                : navigate(`/user-profile/${userInfo?.userHandler}`)
            }
          >
            <span className="ml-4 mr-1 text-lg font-semibold text-gray-700 cursor-pointer sm:text-sm">{`${userInfo?.firstName} ${userInfo?.lastName}`}</span>
            <span className="text-sm text-gray-400 cursor-pointer">
              @{userInfo?.userHandler}
            </span>
            <p className="ml-4 text-sm text-gray-400 sm:text-xs">
              {formattedDateTime}
            </p>
          </div>
          {user.username === username && (
            <div
              className="rounded-full px-3 py-0.5 hover:bg-gray-200 cursor-pointer relative duration-200"
              onClick={() => setEditModal(!editModal)}
            >
              <FaEllipsisV className="text-sm opacity-60" />
              {editModal && (
                <ul className="absolute gap-1 px-1 py-2 m-0 text-sm border-2 rounded-lg bg-neutral-100 dropdown top-8 right-4 w-36">
                  <li
                    className="flex items-center px-3 py-1 rounded-lg hover:bg-neutral-200"
                    onClick={() => editHandler()}
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </li>
                  <li
                    className="flex items-center px-3 py-1 rounded-lg hover:bg-neutral-200"
                    onClick={() => dispatch(deleteUserPost(_id))}
                  >
                    <FaRegTrashAlt className="mr-2" />
                    Delete
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="pt-2 post-container grow sm:pt-2">
        <div>
          <p className="text-gray-600 break-all">{content}</p>
        </div>
        <div className="flex gap-4 my-4 text-gray-500 sm:my-2">
          <div
            className="flex flex-row items-center gap-2 text-sm cursor-pointer"
            title="Like"
            onClick={() => likeDislikeHandler()}
          >
            {isLiked ? (
              <FaHeart className="text-rose-400" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
            <span className="text-gray-500">
              {likeCount === 0
                ? "Like"
                : `${likeCount} ${likeCount === 1 ? "Like" : "Likes"}`}
            </span>
          </div>
          <div
            className="flex flex-row items-center gap-2 text-sm cursor-pointer"
            title="Bookmark"
            onClick={() => addRemoveBookmarkHandler()}
          >
            {isBookmarked ? (
              <FaBookmark className="text-rose-400" />
            ) : (
              <FaRegBookmark className="text-gray-500" />
            )}
            <span className="text-gray-500">
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </span>
          </div>
        </div>
        <div className="flex gap-3 my-3 mt-6 sm:mt-4">
          <img
            src={user.profilePic}
            className="object-cover w-8 h-8 rounded-full cursor-pointer sm:h-6 sm:w-6"
          />
          <div className="flex items-center self-center px-2 py-1 border border-gray-400 border-solid rounded-md grow space-between">
            <input
              className="grow focus:outline-none sm:text-sm"
              placeholder="Write your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className={`text-sm text-rose-400 cursor-pointer font-semibold ${
                comment.trim().length < 1 && "hover:cursor-not-allowed"
              }`}
              onClick={() => postHandler()}
              disabled={comment.trim().length < 1 ? true : false}
            >
              POST
            </button>
          </div>
        </div>
        <div
          className={`flex items-start flex-col${
            viewAll > 2 ? "-reverse" : ""
          }`}
        >
          <div className="flex flex-col w-full gap-4">
            {comments.length > 0 &&
              [...comments]
                .slice(0, viewAll)
                .map((comment) => (
                  <Comment key={comment._id} comment={comment} postId={_id} />
                ))}
          </div>
          {comments.length > 2 && (
            <p
              className="my-1 mb-2 ml-12 text-sm text-gray-500 underline cursor-pointer md:ml-10 hover:text-gray-700"
              onClick={() => setViewAll(viewAll <= 2 ? comments.length : 2)}
            >
              {viewAll <= 2 ? "View all comments" : "Hide comments"}
            </p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
