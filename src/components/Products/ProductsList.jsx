import ProductCard from "./ProductCard";
import "./ProductsList.css";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import Pagination from "../Common/Pagination";


const ProductsList = () => {
  const [page, setPage] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useSearchParams()
  const category = search.get('category')
  const searchQuery = search.get('search')
  const { data, error, isLoading } = useData('/products', {
    params: {
      search: searchQuery, category, page, perPage: 10,
    }
  }, [category, page, searchQuery])

  useEffect(() => {
    setPage(1)
  }, [category, searchQuery])

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8]

  // Pagination 
  // const handleChangePage = page => {
  //   const currentParams = Object.fromEntries([...search])
  //   setSearch({ ...currentParams, page: page })
  // }


  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement


      if (scrollTop + clientHeight >= scrollHeight - 1 && !isLoading && data && page < data.totalPages) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)


    return () => window.removeEventListener('scroll', handleScroll)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading])



  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">Relevance</option>
          <option value="price desc">Price High to Low</option>
          <option value="price asc">Price Low to High</option>
          <option value="rate desc">Rate High to Low</option>
          <option value="rate asc">Rate Low to High</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}

        {data?.products && data?.products.map(product => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}

        {isLoading
          &&
          skeleton.map(n => <ProductCardSkeleton key={n} />)}


      </div>
      {/* {data && <Pagination totalPosts={data?.totalProducts} currentPage={page} postsPerPage={8} onClick={handleChangePage} />} */}
    </section>
  );
};

export default ProductsList;
