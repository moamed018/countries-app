import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const clickHandelr = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <nav className="navbar py-3 shadow-sm bg-fff">
      <div className="container">
        <Link className="text fw-bold fs-4 " to="/">
          Where in the world?
        </Link>
        <button
          type="button"
          className="btn btn-light d-flex align-items-center text fw-semibold bg-fff"
          style={{ gap: "15px" }}
          onClick={() => {
            clickHandelr();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
            width={"25px"}
          >
            <path
              d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
              // fill="var(--bs-body-color)"
              className="path-color"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
          </svg>
          Dark Mode
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
