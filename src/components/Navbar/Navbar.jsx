/* eslint-disable react/prop-types */
import "./Navbar.css";

import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";

import LinkWithIcon from "./LinkWithIcon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/userContext";
import CartContext from "../../contexts/cartContext";
import { getSuggestionAPI } from "./../../services/productServices";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);

  const { cart } = useContext(CartContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    if (search.trim() !== "") {
      getSuggestionAPI(search)
        .then((res) => setSuggestions(res.data))
        .catch((err) => console.log(err));
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedItem((current) => current + 1);
    } else if (e.key === "ArrowUp") {
      setSelectedItem((current) => current - 1);
    } else if (e.key === "Enter" && selectedItem > -1) {
      const suggestion = suggestions[selectedItem];
      navigate(`/products?search=${suggestion.title}`);
      setSearch("");
      setSuggestions([]);
    }
  };

  return (
    <nav className="align_center navbar ">
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form
          className="align_center navbar_form"
          onSubmit={handleSubmitSearch}
        >
          <input
            type="text"
            className="navbar_search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Products"
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="search_button">
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion._id}
                >
                  <Link
                    onClick={() => {
                      setSearch("");
                      setSuggestions([]);
                    }}
                    to={`/products?search=${suggestion.title}`}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      <div className="navbar_links align_center">
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />

        {!user && (
          <>
            <LinkWithIcon title="Login" link="/login" emoji={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
          </>
        )}

        {user && (
          <>
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
            <LinkWithIcon title="Logout" link="/logout" emoji={lock} />

            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
