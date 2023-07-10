import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../profileModalSlice";
import { updateUser } from "../../Authentication/authSlice";
import { toast } from "react-toastify";
import { FaAngleLeft, FaUserCircle, FaCamera } from "react-icons/fa";

export function ProfileModal() {
  const { modal } = useSelector((state) => state.profileModal);
  const { user } = useSelector((state) => state.auth);
  const [userForm, setUserForm] = useState({});
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const updateHandler = () => {
    dispatch(updateUser({ ...userForm }));
    toast.success("User Info Updated !");
    dispatch(closeModal());
  };

  useEffect(() => {
    setUserForm(user);
  }, [user]);

  const updateImageHandler = async (image) => {
    setLoader(true);
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "w5bnbvt6");
      const requestOptions = {
        method: "POST",
        body: data,
      };
      await fetch(
        "https://api.cloudinary.com/v1_1/duurhncmw/image/upload",
        requestOptions
      )
        .then((response) => response.json())
        .then((json) => {
          setUserForm({ ...userForm, profilePic: json.url });
        })
        .catch((error) => {
          console.log(error);
        });
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`inset-0 z-[1000] bg-gray-800 bg-opacity-75 justify-center items-center fixed ${
        modal ? "flex" : "hidden"
      }`}
    >
      <div className="flex flex-col w-4/5 max-w-2xl gap-4 p-4 bg-neutral-100 rounded-xl h-max">
        <div
          onClick={() => {
            dispatch(closeModal());
            setUserForm(user);
          }}
        >
          <FaAngleLeft className="text-2xl cursor-pointer" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex ">
            <p className="w-1/6 gap-4 mr-4 font-semibold text-gray-700">
              Avatar{" "}
            </p>
            {loader ? (
              <p className="ml-6 font-semibold text-gray-700 sm:text-sm">
                Updating...{" "}
              </p>
            ) : (
              <div className="relative">
                <img
                  src={userForm?.profilePic}
                  className="object-cover w-12 h-12 ml-6 rounded-full"
                />
                <FaCamera className="absolute right-0 p-1 bg-white rounded-full cursor-pointer top-8" />
                <input
                  className="absolute right-0 w-8 opacity-0 cursor-pointer top-8"
                  accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp"
                  type="file"
                  onChange={(e) => updateImageHandler(e.target.files[0])}
                />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <p className="gap-4 font-semibold text-gray-700">Link </p>{" "}
            <input
              className="w-9/12 px-3 py-1 text-sm border-2 rounded-lg focus:outline-none"
              value={userForm?.link}
              onChange={(e) =>
                setUserForm({ ...userForm, link: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between">
            <p className="gap-4 font-semibold text-gray-700">Bio </p>
            <textarea
              className="w-9/12 px-3 py-1 text-sm border-2 rounded-lg focus:outline-none"
              value={userForm?.bio}
              onChange={(e) =>
                setUserForm({ ...userForm, bio: e.target.value })
              }
            />
          </div>
        </div>
        <div className="px-1 py-1 text-right">
          <button
            className={`px-4 py-1 rounded-lg bg-rose-500 text-white font-bold hover:bg-rose-400 ${
              loader && "hover:cursor-not-allowed"
            }`}
            onClick={() => updateHandler()}
            disabled={loader ? true : false}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
