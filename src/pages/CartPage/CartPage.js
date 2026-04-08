import React, { useEffect } from "react";
import Loader from "../../components/UI/Loader/Loader";
import ProductList from "../../components/Product/ProductList/ProductList";
import styles from "./CartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartProducts,
  purchaseCart,
  selectCartProducts,
  selectCartLoading,
  selectPurchasing,
} from "../../redux/reducers/cartReducer";
import {
  selectUser,
  selectIsAuthenticated,
  selectAuthInitialized,
} from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  // Fetch all cart products for the user
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authInitialized = useSelector(selectAuthInitialized);
  const cartProducts = useSelector(selectCartProducts);
  const loading = useSelector(selectCartLoading);
  const purchasing = useSelector(selectPurchasing);

  // Redirect to signin if not authenticated (after auth has initialized)
  useEffect(() => {
    if (authInitialized && !isAuthenticated) {
      // navigate("/signin");
      return (
        <h1 style={{ textAlign: "center" }}>
          Please Sign In to view this page
        </h1>
      );
    }
  }, [authInitialized, isAuthenticated]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchCartProducts(user.uid));
    }
  }, [dispatch, user?.uid]);

  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const purchaseProductsHandler = async () => {
    // Write code to purchase the item present in the cart
    // Redirect the user to orders page after successful purchase
    // Clear the item present in the cart after successful purchase
    if (!user?.uid || !cartProducts.length) return;
    const result = await dispatch(
      purchaseCart({ uid: user.uid, cartProducts }),
    );
    if (purchaseCart.fulfilled.match(result)) {
      navigate("/myorders");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.cartPageContainer}>
      {/*cartProduct here is the array of item present in the cart for the user yu can change this as per your need */}
      {!!cartProducts?.length && (
        <aside className={styles.totalPrice}>
          <p>TotalPrice:- ₹{totalPrice}/-</p>
          <button
            className={styles.purchaseBtn}
            onClick={purchaseProductsHandler}
            disabled={purchasing}
          >
            {purchasing ? "Purchasing" : "Purchase"}
          </button>
        </aside>
      )}
      {!!cartProducts?.length ? (
        <ProductList products={cartProducts} onCart={true} />
      ) : (
        <h1>Cart is Empty!</h1>
      )}
    </div>
  );
};

export default CartPage;
