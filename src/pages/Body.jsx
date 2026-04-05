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
  // when home page at / rendered this fun called first
  const fetchLoggedInUser = async (abortcontroller) => {
    try {
      setTimeout(() => {
        abortcontroller.abort("timeout");
      }, 5000);

      const res = await axios.get(BASE_URL + "/api/v1/profile/view", {
        signal: abortcontroller.signal,
        withCredentials: true,
      });

      dispatch(addUser(res.data?.data));
      setLoading(false);
    } catch (error) {
      console.error(error);
      if (error.status === 401) {
        navigate("/login");
      } else {
        navigate("/error-page", {
          state: { message: error?.message, status: error?.status },
          replace: true,
        });
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortcontroller = new AbortController();

    fetchLoggedInUser(abortcontroller);

    return () => {
      abortcontroller.abort();
    };
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
