import useData from "../../hooks/useData";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import "./ProductsSidebar.css";

import confing from "../../config.json";

const ProductsSidebar = () => {
  const { data: categories, error } = useData("/category");

  return (
    <aside className="products_sidebar">
      <h2>Categories</h2>
      <div className="category_links">
        {error && <em className="form_error">{error}</em>}

        {categories &&
          categories.map((category) => (
            <LinkWithIcon
              key={category._id}
              title={category.name}
              link={`/products?category=${category.name}`}
              emoji={`${confing.backendURL}/category/${category.image}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
