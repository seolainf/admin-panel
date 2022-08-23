import { AiOutlineSetting } from "react-icons/ai";
import { FaProductHunt, FaUserCircle, FaAngular } from "react-icons/fa";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/log.webp";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="" />
      </div>
      <div className="sidebar__content">
        <div className="sidebar__list">
          <NavLink to={"/"} className="navlink sidebar__item">
            <RiCompassDiscoverLine className="icon" />
            <span>Home</span>
          </NavLink>
          <NavLink to={"/users"} className="navlink sidebar__item">
            <FaUserCircle className="icon" />
            <span>Users</span>
          </NavLink>

          <NavLink to={"/products"} className="navlink sidebar__item">
            <FaProductHunt className="icon" />
            <span>Products</span>
          </NavLink>
          <NavLink to={"/accessories"} className="navlink sidebar__item">
            <FaAngular className="icon" />
            <span>Accessories</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
