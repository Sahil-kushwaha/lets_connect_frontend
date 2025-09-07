import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-base-300 relative bottom-0 text-gray-400 p-8 sm:p-12 mt-auto rounded-t-xl">
      <div className="container mx-auto max-w-7xl flex flex-col items-center md:flex-row md:justify-between md:gap-x-4 space-y-8 md:space-y-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-2">Let's Connect</h2>
          <p className="text-sm leading-relaxed max-w-md">
            Welcome to the hub where developers meet. We believe the best code
            is built together. Find your next collaborator, share knowledge, and
            grow your career with a community that gets it. Ready to connect?
          </p>
          {/* A simple divider for visual separation */}
          <div className="h-px bg-gray-700 w-16 my-4 md:my-6"></div>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Let's connect All rights reserved.
          </p>
        </div>

        {/* Navigation Links Section */}
        <div className="flex flex-col items-center md:items-start text-sm space-y-4">
          <h3 className="text-white text-sm font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-center md:text-left">
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-white transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-white font-semibold mb-2">Resources</h3>
          <div className="flex flex-col items-center md:items-start gap-y-1 space-x-4 text-sm">
            <Link
              to={"/privacyPolicy"}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to={"/termsConditions"}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              to={"/refundPolicy"}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Refund &amp; Cancellation Policy
            </Link>
            <Link
              to={"/shippingDelivery"}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Shipping &amp; Devlivery
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
