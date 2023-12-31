import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainContainer, NavBar } from "./components";
import { PrivateRoute } from "./components/PrivateRoute";
import { getAllPost, getUserPost } from "./features/Home/postSlice";
import { getAllUser } from "./features/Profile/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {
  Home,
  Modal,
  Profile,
  ProfileModal,
  Explore,
  Login,
  SignUp,
  Bookmark,
  AnyProfile,
} from "./features";
import Landing from "./components/Landing";

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getAllPost());
      dispatch(getAllUser());
      dispatch(getUserPost(user.username));
    }
  }, [token]);

  return (
    <div className="max-w-[1260px] relative mx-auto bg-neutral-100">
      <Router>
        <NavBar />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainContainer>
                  <Home />
                </MainContainer>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <MainContainer>
                  <Profile />
                </MainContainer>
              </PrivateRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <PrivateRoute>
                <MainContainer>
                  <Explore />
                </MainContainer>
              </PrivateRoute>
            }
          />
          <Route
            path="/bookmark"
            element={
              <PrivateRoute>
                <MainContainer>
                  <Bookmark />
                </MainContainer>
              </PrivateRoute>
            }
          />
          <Route
            path="/user-profile/:userId"
            element={
              <PrivateRoute>
                <MainContainer>
                  <AnyProfile />
                </MainContainer>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
        <Modal />
        <ProfileModal />
      </Router>
    </div>
  );
}

export default App;
