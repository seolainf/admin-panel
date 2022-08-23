import React from "react";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ProductCard from "../../components/ProductCard/ProductCard";
import Section from "../../components/Section/Section";
import "./products.scss";

const Products = ({ data, type }) => {
  return (
    <div className="products">
      <div className="products__title">
        <Section title={`List ${type}`} />
        <div className="products__addNew">
          <NavLink to={`/${type}/news`} className="navlink">
            <span>Add News</span>
          </NavLink>
        </div>
      </div>
      {<Loading /> && (
        <div className="products__list">
          {data &&
            data.map((product) => (
              <ProductCard data={product} key={product.id} type={type} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Products;
