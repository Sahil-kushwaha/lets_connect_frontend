import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./pages/Body";
import LoginPage from "./pages/LoginPage";
import SingnUpPage from "./pages/SingnUpPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import {
  PrivacyPolicy,
  RefundCancellation,
  ShippingDelivery,
  TermsConditions,
} from "./pages/PolicyPages";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";

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
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/termsConditions" element={<TermsConditions />} />
            <Route path="/refundPolicy" element={<RefundCancellation />} />
            <Route path="/shippingDelivery" element={<ShippingDelivery />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
