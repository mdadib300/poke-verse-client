import React, { useContext, useState } from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <Link to="/about">About Us</Link>
      </li>
      <li>
        <Link to="/policy">Our Policy</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="dashboard/profile">Dashboard</Link>
      </li>
    </>
  );

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    navigate(`/search?query=${searchText}`);
  };

  return (
    <div>
      <div className="navbar bg-white text-sky-400 shadow-sm px-5 lg:px-30">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white text-sky-400 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none w-28 pb-1 lg:pb-0"
          >
            <img src={logo} alt="Logo" className="w-full" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-2">
            {/* DESKTOP SEARCH */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="input input-bordered input-sm border-sky-300 text-sky-400 bg-white w-48"
              />

              <button
                type="submit"
                className="btn btn-sm border border-sky-400 bg-sky-100 text-sky-400 hover:bg-sky-400 hover:text-white"
              >
                Search
              </button>
            </form>

            {/* MOBILE SEARCH BUTTON */}
            <button
              className="btn btn-circle btn-sm lg:btn-md border border-sky-400 bg-sky-100 text-sky-400 hover:bg-sky-400 hover:text-white lg:hidden"
              onClick={() =>
                document.getElementById("search_modal").showModal()
              }
            >
              <FaMagnifyingGlass />
            </button>

            {/* CART */}
            {user ? (
              <Link to="/dashboard/cart">
                <button className="btn btn-circle btn-sm lg:btn-md border border-sky-400 bg-sky-100 text-sky-400 transition-all duration-200 hover:bg-sky-400 hover:text-white text-sm lg:text-xl">
                  <FaCartShopping />
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-sky-400 bg-sky-100 text-sky-400 text-sm lg:text-base font-medium transition-all duration-200 hover:bg-sky-400 hover:text-white">
                  Log in
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      <dialog id="search_modal" className="modal">
        <div className="modal-box bg-white">
          <form
            onSubmit={(e) => {
              handleSearch(e);
              document.getElementById("search_modal").close();
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="input input-bordered border-sky-300 text-sky-400 bg-white w-full"
            />

            <button
              type="submit"
              className="btn border border-sky-400 bg-sky-100 text-sky-400 hover:bg-sky-400 hover:text-white"
            >
              Search
            </button>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Navbar;
