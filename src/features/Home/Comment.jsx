import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteComment, editComment } from "./postSlice";
import EmojiPicker from "emoji-picker-react";

import {
  FaEllipsisV,
  FaEdit,
  FaRegTrashAlt,
  FaWindowClose,
  FaRegCheckCircle,
} from "react-icons/fa";

export function Comment({ comment, postId }) {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [editModal, setEditModal] = useState(false);
  const [inputComment, setInputComment] = useState(comment.text);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const userInfo =
    allUsers &&
    allUsers?.find((commentUser) => comment.username === commentUser.username);

  const editHandler = () => {
    setIsEdit(false);
    dispatch(
      editComment({
        postId: postId,
        commentId: comment._id,
        commentData: inputComment,
      })
    );
  };
  return (
    <div className="flex gap-3">
      <img
        src={
          user.userHandler === userInfo?.userHandler
            ? user.profilePic
            : userInfo?.profilePic
        }
        className="object-cover w-8 h-8 rounded-full cursor-pointer sm:h-6 sm:w-6"
        onClick={() =>
          comment.username === user.username
            ? navigate("/profile")
            : navigate(`/user-profile/${userInfo?.userHandler}`)
        }
      />
      <div className="px-3 py-1 bg-neutral-200 rounded-xl grow ">
        <div className="flex justify-between h-6 sm:h-4">
          <span
            className="mr-2 text-sm font-semibold cursor-pointer sm:text-xs"
            onClick={() =>
              comment.username === user.username
                ? navigate("/profile")
                : navigate(`/user-profile/${userInfo?.userHandler}`)
            }
          >{`${userInfo?.firstName} ${userInfo?.lastName}`}</span>
          {comment.username === user.username && (
            <div
              className="relative px-2 rounded-full cursor-pointer"
              onClick={() => setEditModal(!editModal)}
            >
              <FaEllipsisV
                className={`text-sm opacity-60 hover:opacity-100 ${
                  isEdit && "hidden"
                }`}
              />
              {editModal && (
                <ul className="absolute gap-1 px-1 py-1 m-0 text-sm bg-white rounded-lg dropdown top-4 right-4 w-30">
                  <li
                    className="flex items-center px-1 py-1 rounded-md hover:bg-neutral-200"
                    onClick={() => {
                      setIsEdit(!isEdit);
                    }}
                  >
                    <FaEdit className="mr-2 " />
                    Edit
                  </li>
                  <li
                    className="flex items-center px-1 py-1 rounded-md hover:bg-neutral-200"
                    onClick={() =>
                      dispatch(
                        deleteComment({
                          postId: postId,
                          commentId: comment._id,
                        })
                      )
                    }
                  >
                    <FaRegTrashAlt className="mr-2" />
                    Delete
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
        {isEdit ? (
          <form
            className="flex items-center self-center pb-1 border-gray-400 rounded-md grow space-between"
            onSubmit={() => editHandler()}
          >
            <input
              className="mr-4 text-sm text-gray-600 border-b-2 border-gray-400 grow focus:outline-none bg-neutral-200"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
            />
            <FaWindowClose
              className="text-gray-500 cursor-pointer"
              aria-hidden="true"
              onClick={() => setIsEdit(false)}
            />
            <FaRegCheckCircle
              className={`cursor-pointer font-semibold ml-2 text-gray-500`}
              aria-hidden="true"
              onClick={() => editHandler()}
            />
          </form>
        ) : (
          <p className="pb-1 text-sm text-gray-500 break-all">{comment.text}</p>
        )}
      </div>
    </div>
  );
}
