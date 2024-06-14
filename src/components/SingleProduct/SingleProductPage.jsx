/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import Loader from './../Common/Loader';
import CartContext from "../../contexts/cartContext";
import UserContext from "../../contexts/userContext";



const SingleProductPage = () => {
  const { addToCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)
  const user = useContext(UserContext)

  // To change active and main product image
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams()

  const { data: product, error, isLoading } = useData(`/products/${id}`)
  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product &&
        <>

          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  key={`${index}${product.title}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>

            <img
              src={`http://localhost:5000/products/${product.images.at(selectedImage)}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>

          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">${product.price.toFixed(2)}</p>

            {user &&
              <>
                <h2 className="quantity_title">Quantity:</h2>
                <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
                <button className="search_button add_cart" onClick={() => addToCart(product, quantity)}>Add to cart</button>
              </>
            }
          </div>
        </>
      }
    </section>
  );
};

export default SingleProductPage;
