
import { Link } from "react-router-dom
const Footer = () => {
  return (
    <footer className="bg-base-300 relative bottom-0 text-gray-400 p-8 sm:p-12 mt-auto rounded-t-xl">
      <div className="container mx-auto max-w-7xl flex flex-col items-center md:flex-row md:justify-between space-y-8 md:space-y-0">
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
            &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
          </p>
        </div>

        {/* Navigation Links Section */}
        <div className="flex flex-col items-center md:items-start text-sm space-y-4">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
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
              <a
                href="/service"
                className="hover:text-white transition-colors duration-200"
              >
                Services
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Icons Section */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 11.9-11.4 9.2 1.5.3 2.9.5 4.4.6 2.4-2.5 5.9-5.9 7.2-11.4 0-.1 0-.1 0-.2z" />
                <path d="M12 19c-4.8 0-8-3-10-6 .8 2.7 3.5 5.5 8 5.5 4.5 0 7.2-2.8 8-5.5-2.2-2.7-5.2-4.5-8-4.5z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7H18v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7H10v-7a6 6 0 0 1 6-6zM4 12H1v12h3zM7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Github"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22.8a.75.75 0 0 0-.75-.75H9.75a.75.75 0 0 0-.75.75v.75H2v-1.5a.75.75 0 0 1 .75-.75h20.5a.75.75 0 0 1 .75.75v1.5H15zM22.8 19a.75.75 0 0 1-.75.75h-19a.75.75 0 0 1-.75-.75V8a.75.75 0 0 1 .75-.75h19a.75.75 0 0 1 .75.75v11zM12 5.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
