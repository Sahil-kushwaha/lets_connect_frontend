import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./pages/Body";
import LoginPage from "./pages/LoginPage";
import SingnUpPage from "./pages/SingnUpPage";
import FeedPage from "./pages/FeedPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<FeedPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SingnUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
