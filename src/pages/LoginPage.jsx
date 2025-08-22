import { useState } from "react";
import axios from "axios";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/constant";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // if user is logged in and try to access login page again (prevent it)
  if (user) return <Navigate to={"/"} />;

  const handleSubmit = async () => {
    try {
      setError("");
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/login`,
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (res.data?.data) dispatch(addUser(res.data.data));

      toast.success("Login Successfully");

      navigate("/", { replace: true });
    } catch (error) {
      if (error.response) {
        const message = error.response.data?.message;
        toast.warn(message);
        setError(message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-10">
      <div className="card card-dash  bg-base-300 w-96">
        <div className="card-body gap-5">
          <h2 className="text-center text-2xl font-bold text-blue-100">
            Login
          </h2>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>

            <input
              type="email"
              value={email}
              placeholder="mail@site.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              value={password}
              required
              placeholder="Password"
              minLength="6"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {/* <p className="validator-hint hidden">
            Must be more than 6 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p> */}
          {error && (
            <p className="text-red-500 my-2 text-center">ERROR::{error}</p>
          )}
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div>
            <p className="text-center">
              Don't Have account?{" "}
              <span className="text-blue-400">
                <NavLink to={"/signup"}>SingUp</NavLink>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
