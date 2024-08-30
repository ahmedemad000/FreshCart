import Style from "./NavBar.module.css";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import vite from "../../../public/vite.svg";
import logo from "../../assets/logo.svg";
import {
  FaFacebook,
  FaLinkedin,
  FaShoppingCart,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { CounterContext } from "../../Context/CounterContext";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function NavBar() {
  const { cartItems } = useContext(CartContext);
  const { counter } = useContext(CounterContext);
  const { token, setToken } = useContext(UserContext);
  console.log({ counter }, "navbar");

  const navigate = useNavigate();
  //signout Function
  function logout() {
    setToken(null);
    navigate("/login");
  }
  useEffect(() => {
    console.log("Mounting NavBar");
  }, []);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex gap-4 flex-wrap items-center  mx-auto p-4">
        <a className="flex  text-3xl items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} alt="" />
        </a>
        {/* Toggler */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex ms-auto items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* ul */}
        <div
          className="hidden w-full grow lg:flex justify-between lg:w-auto"
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            {token && (
              <>
                <li>
                  <Link
                    to=""
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="cart"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="products"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="categories"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="brands"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Brands
                  </Link>
                </li>
              </>
            )}
          </ul>
          

          <ul className="font-medium flex items-center flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg  lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            {!token && (
              <>
                <li>
                  <Link
                    to="login"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="register"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            {token && (
              <>
              <li onClick={logout}>
                <span className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-900 lg:p-0 dark:text-white lg:dark:hover:text-red-500 dark:hover:bg-red-700 dark:hover:text-white lg:dark:hover:bg-transparent">
                  SignOut
                </span>
              </li>
              <li>
                <span className="block relative cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-900 lg:p-0 dark:text-white lg:dark:hover:text-red-500 dark:hover:bg-red-700 dark:hover:text-white lg:dark:hover:bg-transparent">
                  <FaShoppingCart className="text-xl"/> 
                  <span className="absolute top-0 end-0 translate-x-1/2 -translate-y-1/2">{cartItems}</span>
                </span>
              </li>
              </>
            )}
            <li>
              <ToggleMode />
            </li>
            <li className="flex lg:gap-4 ">
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-red-700 lg:p-0 dark:text-white lg:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-900 lg:p-0 dark:text-white lg:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-700 lg:p-0 dark:text-white lg:dark:hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                <FaTiktok />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function ToggleMode() {
  const [isDarkMode, setisDarkMode] = useState(
    localStorage.getItem("color-theme") === "dark" ||
      (
        !("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)")
      ).matches
  );
  const ref = useRef(document.querySelector("html"));
  // Updating Phase
  useEffect(() => {
    toggleDarkFn();
  }, [isDarkMode]);
  function toggleDarkFn() {
    ref.current.classList.toggle("dark", isDarkMode);
  }
  return (
    <>
      {/* <button onClick={() => setisDarkMode(!isDarkMode)}>
        {isDarkMode ? <MdDarkMode  className="text-white"/> : <MdOutlineDarkMode />}
      </button> */}
      <button
        onClick={() => setisDarkMode(!isDarkMode)}
        id="theme-toggle"
        type="button"
        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
      >
        {isDarkMode ? (
          <svg
            id="theme-toggle-dark-icon"
            className=" w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg
            id="theme-toggle-light-icon"
            className=" w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </>
  );
}
