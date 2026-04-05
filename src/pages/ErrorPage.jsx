import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function ErrorPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.message;
  const status = location.state?.status;
  if (user) navigate("/");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="bg-base-300 rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">{status}</h1>
        <h2 className="text-2xl font-semibold mb-2">
          {status === 404 ? "Page Not Found" : "check you network connection"}
        </h2>
        <p className="mb-6 text-base-content">
          {status === 404
            ? "Sorry, the page you are looking for does not exist or has been moved."
            : ""}
        </p>
        {errorMessage && (
          <p className="text-2xl m-4 text-red-500">ERROR:: {errorMessage}</p>
        )}
        <NavLink to="/" className="btn btn-primary">
          {user ? "Go Home" : "Retry"}
        </NavLink>
      </div>
    </div>
  );
}

export default ErrorPage;
