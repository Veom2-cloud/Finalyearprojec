import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/userActions";
import "bootstrap/dist/css/bootstrap.css";

export default function Navbar() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { user } = userstate;
  const dispatch = useDispatch();
  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
        <a className="navbar-brand" href="/">
          Ustar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i style={{ color: "black" }} className="fas fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <div className="dropdown mt-2 mr-2">
                <a
                  style={{ color: "black" }}
                  className="dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.username}
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {user.userId == "63a8aad8b9b10ea377fbf4c8" ? (
                    <a className="dropdown-item" href="/admin">
                      Admin
                    </a>
                  ) : (
                    <a className="dropdown-item">Not Admin</a>
                  )}
                 
                </div>
              </div>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
