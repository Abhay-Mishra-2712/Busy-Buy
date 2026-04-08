import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import { useNavigate } from "react-router-dom";
import MinusIcon from "../../../UI/Icons/MinusIcon";
import PlusIcon from "../../../UI/Icons/PlusIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../../../redux/reducers/cartReducer";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../../../redux/reducers/authReducer";

const ProductDetails = ({ title, price, productId, onCart, quantity }) => {
  const [productAddingToCart, setProductAddingToCart] = useState(false);
  const [productRemovingFromCart, setProductRemovingCart] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const addProductToCart = async () => {
    // Function to add product to cart
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    setProductAddingToCart(true);
    await dispatch(addToCart({ uid: user.uid, productId }));
    setProductAddingToCart(false);
  };
  const removeProduct = async () => {
    // Function to remaove the cart
    setProductRemovingCart(true);
    await dispatch(removeFromCart({ uid: user.uid, productId }));
    setProductRemovingCart(false);
  };

  const handleAdd = async () => {
    // Function for Handling the product quantity increase
    await dispatch(increaseQuantity({ uid: user.uid, productId }));
  };

  const handleRemove = async () => {
    // Handling the product quantity decrease
    await dispatch(decreaseQuantity({ uid: user.uid, productId }));
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.productName}>
        <p>{`${title.slice(0, 35)}...`}</p>
      </div>
      <div className={styles.productOptions}>
        <p>₹ {price}</p>
        {onCart && (
          <div className={styles.quantityContainer}>
            <MinusIcon handleRemove={handleRemove} />
            {quantity}
            <PlusIcon handleAdd={handleAdd} />
          </div>
        )}
      </div>
      {/* Conditionally Rendering buttons based on the screen */}
      {!onCart ? (
        <button
          className={styles.addBtn}
          title="Add to Cart"
          disabled={productAddingToCart}
          onClick={addProductToCart}
        >
          {productAddingToCart ? "Adding" : "Add To Cart"}
        </button>
      ) : (
        <button
          className={styles.removeBtn}
          title="Remove from Cart"
          onClick={removeProduct}
          disabled={productRemovingFromCart}
        >
          {productRemovingFromCart ? "Removing" : "Remove From Cart"}
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
