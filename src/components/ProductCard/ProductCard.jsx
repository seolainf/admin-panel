import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./productCard.scss";

const ProductCard = (props) => {
  const { data, type } = props;

  const [color, setColor] = useState("");
  const [isActive, setIsActive] = useState(null);
  useEffect(() => {
    setColor(data.options[0].color);
    setIsActive(data.options[0]);
  }, [data]);

  return (
    <div className="productCard">
      <div className="productCard__content">
        <div className="productCard__image">
          <img src={data.imgURL[0]} alt="" />
        </div>
        <div className="productCard__info">
          <h5>{data.name}</h5>
          <div className="productCard__info_size">
            Kích thước:
            {data.sizes.map((size, index) => (
              <span key={index}> {size}</span>
            ))}
          </div>
          <div className="productCard__info_options">
            <span>Màu sắc: {color}</span>
            <div className="productCard__info_color">
              {data.options.map((option, index) => (
                <div
                  className={`productCard__info_item ${
                    isActive === option ? "active" : ""
                  }`}
                  key={index}
                  title={option.color}
                  onClick={() => setIsActive(option)}
                >
                  <span
                    style={{ backgroundColor: `${option.clname}` }}
                    onClick={() => setColor(option.color)}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="productCard__edit">
        <NavLink to={`/${type}/edit/${data.id}`} className="navlink">
          <span>Edit</span>
        </NavLink>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProductCard;
