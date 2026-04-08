// Implement your code for product reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { addDataToCollection } from "../../utils/utils";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      await addDataToCollection();
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);
      const products = snapshot.docs.map((doc) => doc.data());
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    filterProducts: (state, action) => {
      const { query, priceRange, categories } = action.payload;
      const anyCategory = Object.values(categories).some(Boolean);

      state.filteredProducts = state.products.filter((product) => {
        const matchesQuery = product.title
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesPrice = product.price <= Number(priceRange);
        const matchesCategory = anyCategory
          ? (categories.mensFashion && product.category === "men's clothing") ||
            (categories.womensFashion &&
              product.category === "women's clothing") ||
            (categories.jewelery && product.category === "jewelery") ||
            (categories.electronics && product.category === "electronics")
          : true;
        return matchesQuery && matchesPrice && matchesCategory;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { filterProducts } = productsSlice.actions;
export const selectProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) =>
  state.products.filteredProducts;
export const selectProductsLoading = (state) => state.products.loading;
export default productsSlice.reducer;
