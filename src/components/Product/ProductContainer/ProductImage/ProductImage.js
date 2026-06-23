import React from "react";
import styles from "./ProductImage.module.css";

const ProductImage = ({ image }) => {
  return (
    <div className={styles.imageContainer}>
      <img
        src={image}
        alt="Product"
        className={styles.productImg}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png";
        }}
      />
    </div>
  );
};

export default ProductImage;
