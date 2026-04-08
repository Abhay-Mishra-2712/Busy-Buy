// Implement your code for cart reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  getUserCartProducts,
  getProductsUsingProductIds,
} from "../../utils/utils";
import { toast } from "react-toastify";

// Fetch cart products for a user
export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async (uid, { rejectWithValue }) => {
    try {
      const { data } = await getUserCartProducts(uid);
      if (!data || !Object.keys(data).length) return [];
      const products = await getProductsUsingProductIds(data);
      if (!products) return [];
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Add product to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ uid, productId }, { rejectWithValue }) => {
    try {
      const { docRef, data } = await getUserCartProducts(uid);
      let updatedCart;
      if (!data || !Object.keys(data).length) {
        updatedCart = { [productId]: 1 };
      } else if (data[productId]) {
        updatedCart = { ...data, [productId]: data[productId] + 1 };
      } else {
        updatedCart = { ...data, [productId]: 1 };
      }
      await setDoc(docRef, updatedCart);
      const products = await getProductsUsingProductIds(updatedCart);
      toast.success("Product Added Successfully");
      return products || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Remove product from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ uid, productId }, { rejectWithValue }) => {
    try {
      const { docRef, data } = await getUserCartProducts(uid);
      if (!data) return [];
      const updatedCart = { ...data };
      delete updatedCart[productId];
      await setDoc(docRef, updatedCart);
      if (!Object.keys(updatedCart).length) return [];
      const products = await getProductsUsingProductIds(updatedCart);
      toast.success("Product Removed Successfully");
      return products || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Increase product quantity
export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ uid, productId }, { rejectWithValue }) => {
    try {
      const { docRef, data } = await getUserCartProducts(uid);
      if (!data) return [];
      const updatedCart = { ...data, [productId]: (data[productId] || 0) + 1 };
      await setDoc(docRef, updatedCart);
      const products = await getProductsUsingProductIds(updatedCart);
      return products || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Decrease product quantity
export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ uid, productId }, { rejectWithValue }) => {
    try {
      const { docRef, data } = await getUserCartProducts(uid);
      if (!data) return [];
      let updatedCart;
      if (data[productId] <= 1) {
        updatedCart = { ...data };
        delete updatedCart[productId];
      } else {
        updatedCart = { ...data, [productId]: data[productId] - 1 };
      }
      await setDoc(docRef, updatedCart);
      if (!Object.keys(updatedCart).length) return [];
      const products = await getProductsUsingProductIds(updatedCart);
      return products || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Purchase all cart products
export const purchaseCart = createAsyncThunk(
  "cart/purchaseCart",
  async ({ uid, cartProducts }, { rejectWithValue }) => {
    try {
      const orderDocRef = doc(db, "userOrders", uid);
      const orderDocSnap = await getDoc(orderDocRef);

      // Build the new order object: { [productId]: quantity, ..., date: timestamp }
      const newOrder = {};
      cartProducts.forEach((p) => {
        newOrder[p.id] = p.quantity;
      });
      newOrder.date = Date.now();

      let prevOrders = [];
      if (orderDocSnap.exists()) {
        prevOrders = orderDocSnap.data().orders || [];
      }

      await setDoc(orderDocRef, { orders: [...prevOrders, newOrder] });

      // Clear cart
      const { docRef: cartDocRef } = await getUserCartProducts(uid);
      await setDoc(cartDocRef, {});

      toast.success("Order placed successfully!");
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Fetch user orders
export const fetchOrders = createAsyncThunk(
  "cart/fetchOrders",
  async (uid, { rejectWithValue }) => {
    try {
      const orderDocRef = doc(db, "userOrders", uid);
      const orderDocSnap = await getDoc(orderDocRef);

      if (!orderDocSnap.exists()) return [];

      const rawOrders = orderDocSnap.data().orders || [];
      if (!rawOrders.length) return [];

      // Hydrate each order: fetch product details for each order object
      const hydratedOrders = await Promise.all(
        rawOrders.map(async (order) => {
          const products = await getProductsUsingProductIds(order);
          if (!products) return [];
          return products;
        }),
      );

      return hydratedOrders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    orders: [],
    loading: false,
    purchasing: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCartProducts
      .addCase(fetchCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // increaseQuantity
      .addCase(increaseQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload;
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // decreaseQuantity
      .addCase(decreaseQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload;
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // purchaseCart
      .addCase(purchaseCart.pending, (state) => {
        state.purchasing = true;
      })
      .addCase(purchaseCart.fulfilled, (state, action) => {
        state.purchasing = false;
        state.cartProducts = action.payload;
      })
      .addCase(purchaseCart.rejected, (state, action) => {
        state.purchasing = false;
        state.error = action.payload;
      })
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export const selectCartProducts = (state) => state.cart.cartProducts;
export const selectCartLoading = (state) => state.cart.loading;
export const selectPurchasing = (state) => state.cart.purchasing;
export const selectOrders = (state) => state.cart.orders;
export default cartSlice.reducer;
