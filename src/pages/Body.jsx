import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  console.log("body render");
  // when home page at / rendered this fun called first
  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/v1/profile/view", {
        withCredentials: true,
      });
      setLoading(false);
      dispatch(addUser(res.data?.data));
    } catch (error) {
      console.error(error);
      if (error.status === 401) {
        navigate("/login");
      } else {
        navigate("/error-page", {
          state: { message: error?.message },
          replace: true,
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
