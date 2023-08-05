import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home/Home";
import AboutUs from "./components/Home/AboutUs";
import ContactUs from "./components/Home/ContactUs";
import NotFound from "./components/layout/NotFound";
import SignUP from "./components/Auth/SignUP";
import ChangePassword from "./components/Auth/ChangePassword";
import ForgetPassword from "./components/Auth/ForgetPassword";
import LoginPage from "./components/Auth/LoginPage";
import ResetPassword from "./components/Auth/ResetPassword";
import Task from "./components/Task/Task";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
import { getUser } from "./redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "./components/layout/Spinner";
import DeleteUser from "./components/Auth/DeleteUser";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
// mavigate
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Router>
        <Header isAuth={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/signup" element={<SignUP isAuth={isAuthenticated} />} />
          <Route path="/delete" element={<DeleteUser isAuth={isAuthenticated} />} />
          <Route
            path="/login"
            element={<LoginPage isAuth={isAuthenticated} />}
          />
          <Route
            path="/password/change"
            element={<ChangePassword isAuth={isAuthenticated} />}
          />
          <Route
            path="/password/forget"
            element={<ForgetPassword isAuth={isAuthenticated} />}
          />
          <Route
            path="/password/reset/:token"
            element={<ResetPassword isAuth={isAuthenticated} />}
          />
          <Route path="/me" element={<Profile isAuth={isAuthenticated} />} />
          <Route
            path="/me/edit"
            element={<EditProfile isAuth={isAuthenticated} />}
          />
          <Route path="/task" element={<Task isAuth={isAuthenticated} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
