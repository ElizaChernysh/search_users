import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="Navigation">
      <h3>Github Search</h3>

      <span>
        <Link className="Navigation__link" to="/">
          Home
        </Link>
        <Link className="Navigation__link" to="/favorites">
          Favorites
        </Link>
      </span>
    </nav>
  );
};
