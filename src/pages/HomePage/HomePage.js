import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import ProductList from "../../components/Product/ProductList/ProductList";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Loader from "../../components/UI/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  filterProducts,
  selectFilteredProducts,
  selectProductsLoading,
} from "../../redux/reducers/productsReducer";

function HomePage() {
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState(75000);
  const [categories, setCategories] = useState({
    mensFashion: false,
    electronics: false,
    jewelery: false,
    womensFashion: false,
  });

  // Fetch products on app mount
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);
  const loading = useSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // Rerender the products if the search or filter parameters change

  useEffect(() => {
    dispatch(filterProducts({ query, priceRange, categories }));
  }, [query, priceRange, categories, dispatch]);

  // Display loader while products are fetching using the Loader Component
  if (loading) return <Loader />;

  return (
    <div className={styles.homePageContainer}>
      <FilterSidebar
        setPriceRange={setPriceRange}
        setCategories={setCategories}
        priceRange={priceRange}
      />
      <form className={styles.form}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <ProductList products={filteredProducts} onCart={false} />
    </div>
  );
}

export default HomePage;
