import React, { useState, useEffect } from "react";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./OrdersPage.module.css";
import OrderTable from "../../components/OrderTable/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  selectOrders,
  selectCartLoading,
} from "../../redux/reducers/cartReducer";
import {
  selectAuthInitialized,
  selectIsAuthenticated,
  selectUser,
} from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authInitialized = useSelector(selectAuthInitialized);
  const orders = useSelector(selectOrders);
  const loading = useSelector(selectCartLoading);

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
      dispatch(fetchOrders(user.uid));
    }
  }, [dispatch, user?.uid]);

  if (loading) {
    return <Loader />;
  }

  if (!loading && !orders.length)
    return <h1 style={{ textAlign: "center" }}>No Orders Found!</h1>;

  return (
    <div className={styles.ordersContainer}>
      <h1>Your Orders</h1>
      {orders.map((order, idx) => {
        return <OrderTable order={order} key={idx} />;
      })}
    </div>
  );
};

export default OrdersPage;
