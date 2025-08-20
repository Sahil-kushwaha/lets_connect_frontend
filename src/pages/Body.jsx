import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // when home page at / rendered this fun called first
  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/v1/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data?.data));
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);
  return (
    <main>
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Body;
