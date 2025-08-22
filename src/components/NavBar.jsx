import { Link } from "react-router-dom";
import profile_icon from "../assets/profile_icon.png";
import { useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";
const NavBar = () => {
  console.log("nevrender");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const captalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // logout handler
  const handleLogout = async () => {
    console.log("logout");
    try {
      const res = await axios.post(
        BASE_URL + "/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      toast.success("Logout Successfully");
      navigate("/login", { replacee: true });
      console.log(res.data.message);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  return (
    <nav>
      <div>
        <div className="navbar bg-base-200 shadow-sm">
          <div className="flex-1">
            <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl">
              Let's Connect
            </Link>
          </div>
          {user && <span>{"Welcome, " + captalizeFirst(user.firstName)}</span>}
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-4"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="profile logo"
                    src={user ? user.avatarUrl : profile_icon}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {user && (
                  <div>
                    <li>
                      <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <div aria-label="logout button" onClick={handleLogout}>
                        Logout
                      </div>
                    </li>
                  </div>
                )}
                {!user && (
                  <div>
                    <li>
                      <Link to="/login" className="justify-between">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to={"/signup"}>Singup</Link>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
