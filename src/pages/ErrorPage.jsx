import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ErrorPage() {
  const location = useLocation();
  const errorMessage = location.state?.message;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="bg-base-300 rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="mb-6 text-base-content">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        {errorMessage && (
          <p className="text-2xl text-red-500">ERROR:: {errorMessage}</p>
        )}
        <NavLink to="/" className="btn btn-primary">
          Go Home
        </NavLink>
      </div>
    </div>
  );
}

export default ErrorPage;
