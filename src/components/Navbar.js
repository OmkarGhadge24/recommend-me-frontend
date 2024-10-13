import React, { useState, useContext } from "react";
import { FaInfoCircle, FaBars, FaTimes } from "react-icons/fa";
import { LuMoonStar, LuSun } from "react-icons/lu";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Model from "./Model";
import { ThemeContext } from "../App";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div
      className={`py-4 px-6 flex items-center justify-between ${
        theme === "dark" ? "bg-gray-700" : "bg-gray-200"
      } relative`}
    >
      <h2 className="text-sm sm:text-md lg:text-xl font-semibold">
        Recommend Me
      </h2>

      <div className="flex gap-4 items-center">
        {/* Theme toggle icon */}
        <button onClick={toggleTheme} className="text-xl">
          {theme === "dark" ? <LuSun /> : <LuMoonStar />}
        </button>

        <div className="md:hidden cursor-pointer" onClick={toggleDrawer}>
          {drawerOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </div>
      </div>

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-64 ${
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        } p-5 transition-transform transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-50`}
      >
        <div className="flex flex-col gap-5">
          {/* User profile and login/logout */}
          {user ? (
            <div className="flex flex-col items-center">
              <img
                src={user.photoURL || "default_profile_image.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full mb-4"
                onClick={() => navigate("/profile")}
              />
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {/* Info Button for small screens */}
          {drawerOpen ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setOpen(true)}
            >
              Info
            </button>
          ) : (
            <FaInfoCircle
              className="cursor-pointer text-xl"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Desktop Menu - Remains as it is */}
      <div className="hidden md:flex gap-5 items-center">
        <div>
          {user ? (
            <div className="flex gap-5 items-center">
              <img
                src={user.photoURL || "default_profile_image.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => navigate("/profile")}
              />
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md ml-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>

        <FaInfoCircle
          className="cursor-pointer text-xl"
          onClick={() => setOpen(true)}
        />
      </div>

      <Model onClose={() => setOpen(false)} isOpen={isOpen}>
        <div className="min-h-[60vh] p-6 overflow-y-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center">
            About Recommend Me
          </h2>
          <p className="text-xs mb-2 md:text-base lg:text-lg md:mb-3">
            <strong>Recommend Me</strong> is your go-to platform for
            personalized product recommendations. Our system analyzes data to
            provide the most relevant products for you, helping you make
            informed purchasing decisions.
          </p>
          <p className="text-xs mb-2 md:text-base lg:text-lg md:mb-3">
            Explore the latest in tech, fashion, home essentials, and more,
            curated just for you. Whether you're looking for a new gadget or
            stylish clothing, we've got you covered.
          </p>
          <p className="text-xs mb-2 md:text-base lg:text-lg md:mb-3">
            If you want to add products to your favorites, please{" "}
            <span className="text-blue-600">log in</span>. Once logged in, you
            can easily view and manage all your favorite products in your
            profile.
          </p>
          <p className="text-xs mb-2 md:text-base lg:text-lg md:mb-3">
            <span className="font-bold">Note: </span>It may take some time to
            collect the data, so please be patient while we find the best
            options for you.
          </p>
        </div>
      </Model>
    </div>
  );
};

export default Navbar;
