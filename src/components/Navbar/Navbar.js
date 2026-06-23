import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import HomeIcon from "../../assets/home.png";
import OrdersIcon from "../../assets/basket.png";
import SignIn from "../../assets/Log in.png";
import Logout from "../../assets/Log Out.png";
import Cart from "../../assets/cart.png";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  selectIsAuthenticated,
} from "../../redux/reducers/authReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = () => {
    setMenuOpen(false);
    scrollTop();
  };

  const onLogoutHandler = () => {
    dispatch(logoutUser());
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={handleNavClick}>
          Busy Buy
        </NavLink>

        {/* Hamburger button — only visible on mobile */}
        <button
          className="menu-icon"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <NavLink to="/" className="nav-links" onClick={handleNavClick}>
              <span>
                <img className="icon_styles" src={HomeIcon} alt="Home" />
              </span>
              Home
            </NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink
                  to="/myorders"
                  className="nav-links"
                  onClick={handleNavClick}
                >
                  <span>
                    <img
                      className="icon_styles"
                      src={OrdersIcon}
                      alt="Orders"
                    />
                  </span>
                  My Orders
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className="nav-links"
                  onClick={handleNavClick}
                >
                  <span>
                    <img className="icon_styles" src={Cart} alt="Cart" />
                  </span>
                  Cart
                </NavLink>
              </li>
            </>
          )}

          <li className="nav-item">
            {isAuthenticated ? (
              <NavLink to="/" onClick={onLogoutHandler} className="nav-links">
                <span>
                  <img className="icon_styles" src={Logout} alt="Logout" />
                </span>
                Logout
              </NavLink>
            ) : (
              <NavLink
                to="/signin"
                className="nav-links"
                onClick={handleNavClick}
              >
                <span>
                  <img className="icon_styles" src={SignIn} alt="SignIn" />
                </span>
                SignIn
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
