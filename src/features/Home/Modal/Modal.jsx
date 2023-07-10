import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserPost, editUserPost } from "../postSlice";
import { closePostModal } from "./postModalSlice";
import { FaAngleLeft, FaUserCircle } from "react-icons/fa";

export function Modal() {
  const dispatch = useDispatch();
  const { postModal, postInfo } = useSelector((state) => state.postModal);

  const [input, setInput] = useState("");

  useEffect(() => {
    if (postInfo && postInfo.content) {
      setInput(postInfo.content);
    }
  }, [postInfo]);

  const postHandler = () => {
    postInfo
      ? dispatch(
          editUserPost({
            ...postInfo,
            content: input,
          })
        )
      : dispatch(
          addUserPost({
            content: input,
          })
        );
    setInput("");
    dispatch(closePostModal());
  };

  return (
    <div
      className={`inset-0 z-[1000] bg-gray-800 bg-opacity-75 justify-center items-center fixed ${
        postModal ? "flex" : "hidden"
      }`}
    >
      <div className="flex flex-col w-1/2 gap-4 p-4 bg-neutral-100 rounded-xl md:w-4/5 ">
        <div className="flex flex-row">
          <FaAngleLeft
            className="text-2xl cursor-pointer text-rose-500"
            onClick={() => {
              dispatch(closePostModal());
              setInput("");
            }}
          />
          <FaUserCircle className="ml-4 text-2xl text-rose-500" />
        </div>
        <div>
          <textarea
            className="w-full px-3 py-4 border-2 border-gray-400 border-solid rounded-lg resize-none h-52 focus:outline-none"
            placeholder="What is happening?!..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="px-1 py-1 bg-white rounded-lg">
          <button
            className={`px-4 py-1 w-full rounded-lg bg-rose-500 text-white font-bold hover:bg-rose-400  ${
              input.length < 5 && "hover:cursor-not-allowed"
            }`}
            disabled={input.trim().length < 5 ? true : false}
            onClick={() => postHandler()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
