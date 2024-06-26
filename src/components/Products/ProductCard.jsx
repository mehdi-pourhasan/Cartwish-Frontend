/* eslint-disable react/prop-types */
import "./ProductCard.css";
import config from "../../config.json";
import star from "../../assets/white-star.png";
import bassket from "../../assets/basket.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../contexts/cartContext";
import UserContext from "../../contexts/userContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/product/${product?._id}`}>
          <img
            src={`${config.backendURL}/products/${product?.images[0]}`}
            alt="product image"
          />
        </NavLink>
      </div>

      <div className="product_details">
        <h3 className="product_price">${product?.price}</h3>
        <p className="product_title">{product?.title}</p>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" /> {product?.reviews.rate}
            </p>
            <p className="product_review_count">
              {product?.reviews.ratingCounts}
            </p>
          </div>

          {product?.stock > 0 && user && (
            <button
              onClick={() => addToCart(product, 1)}
              className="add_to_cart"
            >
              <img src={bassket} alt="basket" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
