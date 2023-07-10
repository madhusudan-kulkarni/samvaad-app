import { NavLink } from "react-router-dom";
import { logoutUser } from "../features/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { openPostModal } from "../features/Home/Modal/postModalSlice";
import { toast } from "react-toastify";
import {
  FaHome,
  FaBookmark,
  FaUserCircle,
  FaCompass,
  FaPlusCircle,
} from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";

export function SideBar() {
  const dispatch = useDispatch();
  return (
    <aside className="flex flex-col w-1/4 mr-2 bg-neutral-100 md:mr-0 md:fixed md:bottom-0 md:z-30 md:w-full md:h-14">
      <div className="sticky top-6">
        <NavLink to="/">
          <header className="flex items-center font-bold text-rose-500 md:hidden">
            <p className="ml-4 text-3xl sm:ml-2">Samvaad</p>
          </header>
        </NavLink>
        <main className="pr-4 my-4 md:pr-0 md:my-1 md:flex md:justify-around md:text-2xl md:pt-2">
          <li className="md:hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "menu-links active " : "menu-links"
              }
            >
              <div className="flex items-center ml-4">
                <FaHome className="mr-3" size={23} />
                <span className="text-lg md:hidden ">Home</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                isActive ? "menu-links active " : "menu-links"
              }
            >
              <div className="flex items-center ml-4">
                <FaCompass className="mr-3" size={23} />
                <span className="text-lg md:hidden">Explore</span>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/bookmark"
              className={({ isActive }) =>
                isActive ? "menu-links active " : "menu-links"
              }
            >
              <div className="flex items-center ml-4">
                <FaBookmark className="mr-3" size={23} />
                <span className="text-lg md:hidden">Bookmarks</span>
              </div>
            </NavLink>
          </li>
          <li className="hidden mt-1 md:block sm:block">
            <FaPlusCircle
              size={30}
              className="rounded-full text-rose-500 "
              onClick={() => dispatch(openPostModal())}
            />
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "menu-links active " : "menu-links"
              }
            >
              <div className="flex items-center ml-4">
                <FaUserCircle className="mr-3" size={23} />
                <span className="text-lg md:hidden"> Profile</span>
              </div>
            </NavLink>
          </li>
          <li
            className="menu-links"
            onClick={() => {
              dispatch(logoutUser());
              toast.success("Logged Out !");
            }}
          >
            <div className="flex items-center ml-4">
              <FaArrowRightToBracket className="mr-3" size={23} />
              <span className="text-lg md:hidden">Logout</span>
            </div>
          </li>
          <li className="md:hidden">
            <button
              className="w-[90%] py-3 px-6 text-base font-semibold text-white bg-rose-500 hover:bg-rose-400 rounded-full shadow-md transition duration-300 ease-in-out"
              onClick={() => dispatch(openPostModal())}
            >
              Post
            </button>
          </li>
        </main>
      </div>
    </aside>
  );
}
