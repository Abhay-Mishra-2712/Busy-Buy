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
  const [searchTerm, setSearchTerm] = useState("");
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
    dispatch(filterProducts({ searchTerm, priceRange, categories }));
  }, [searchTerm, priceRange, categories, dispatch]);

  // Display loader while products are fetching using the Loader Component
  if (loading) return <Loader />;

  return (
  <div className={styles.homePageContainer}>
    <FilterSidebar
      setCategories={setCategories}
      setPriceRange={setPriceRange}
      priceRange={priceRange}
      categories={categories}
    />
    {/* ← add this wrapper div */}
    <div className={styles.mainContent}>
      <form className={styles.form}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {filteredProducts.length > 0 && (
        <ProductList products={filteredProducts} onCart={false} />
      )}
    </div>
  </div>
);
}

export default HomePage;
