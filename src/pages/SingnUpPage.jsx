import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import InputField from "../components/input";
import { validateSignUpData } from "../utils/validator";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SingnUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (validateSignUpData({ firstName, lastName, email, password })) {
        toast.error(
          validateSignUpData({ firstName, lastName, email, password })
        );
        return;
      }
      const res = await axios.post(BASE_URL + "/api/v1/auth/signup", {
        firstName,
        lastName,
        emailId: email,
        password,
      });
      dispatch(addUser(res.data.data));
      toast.success("Sing up Successfully");
      setError("");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-3xs  min-h-screen p-4">
      <form
        onSubmit={handleSignUp}
        className="bg-base-300 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        {error && (
          <p className="text-red-500 text-center my-1">ERROR::{error}</p>
        )}
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-10">
          Sign Up
        </h2>

        <InputField
          label="First Name"
          type="text"
          placeholder="First Name"
          value={firstName}
          handleOnChange={(e) => setFirstName(e.target.value)}
          required
        />
        <InputField
          label="Last Name"
          type="text"
          placeholder="Last Name"
          value={lastName}
          handleOnChange={(e) => setLastName(e.target.value)}
        />
        <InputField
          label="Email Address"
          type="email"
          placeholder="example@email.com"
          value={email}
          handleOnChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          handleOnChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-center my-5">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center m relative -top-10 text-neutral-300">
        Already Have an Account?{" "}
        <span className="text-blue-400">
          <Link to={"/login"}>Login</Link>
        </span>
      </div>
    </div>
  );
}

export default SingnUpPage;
