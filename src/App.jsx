import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./pages/Body";
import LoginPage from "./pages/LoginPage";
import SingnUpPage from "./pages/SingnUpPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<FeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SingnUpPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
