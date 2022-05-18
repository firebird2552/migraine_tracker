import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const Header = ({ openModal }) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const handleClick = () => {
    setDisplayDropdown(!displayDropdown);
  };

  return (
    <div className="header-container">
      <div className="header-text">
        <h1>Migraine Tracker</h1>
        <nav className="navbar">
          <NavLink className="link-item" to="">
            Event List
          </NavLink>
          <div className="dropdown-menu">
            <div
              className="dropdown-name link-item"
              onClick={(e) => handleClick(e)}
            >
              Add
            </div>
            <div
              id="add-dropdown"
              className={`dropdown-options ${displayDropdown ? null : "hide"}`}
            >
              <div
                className="link-item"
                onClick={() => {
                  openModal();
                  setDisplayDropdown(false);
                }}
              >
                Add Migraine
              </div>
              <NavLink className="link-item" to="">
                Add Medications
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
