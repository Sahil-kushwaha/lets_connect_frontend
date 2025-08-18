import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./pages/Body";
import LoginPage from "./pages/LoginPage";
import SingnUpPage from "./pages/SingnUpPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="singup" element={<SingnUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
