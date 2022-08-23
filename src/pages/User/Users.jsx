import React from "react";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Section from "../../components/Section/Section";
import "./users.scss";

const Users = () => {
  return (
    <div className="users">
      <div className="products__title">
        <Section title={"List Users"} />
        <div className="products__addNew">
          <NavLink to={"/users/news"} className="navlink">
            <span>Add News</span>
          </NavLink>
        </div>
      </div>
      <Loading />
    </div>
  );
};

export default Users;
