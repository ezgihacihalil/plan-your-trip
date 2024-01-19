import { Product } from "../Container/types";
import css from "./style.module.css";

import { memo, useMemo } from "react";
import { calculateDiscountedPrice, generateImageUrl } from "./utils";

interface ProductCardProps {
  product: Product;
  isMobile: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, isMobile }) => {
    const discountedPrice = useMemo(
      () =>
        calculateDiscountedPrice(
          product.price,
          product.discount_percentage ?? null
        ),
      [product.price, product.discount_percentage]
    );

    const imageUrl = useMemo(
      () => generateImageUrl(product.image, isMobile),
      [product.image, isMobile]
    );

    return (
      <a href={product.product_url} key={product.id} className={css.card}>
        <div className={css.imageContainer}>
          <img
            className={css.image}
            src={imageUrl}
            alt={product.title}
            loading="lazy"
          />
        </div>
        <div className={css.content}>
          <div className={css.contentContainer}>
            <h2 className={css.title}>{product.title}</h2>
            <p className={css.summary}>{product.summary}</p>
          </div>
          <div className={css.priceContainer}>
            {discountedPrice && (
              <p className={`${css.price} ${css.discountedPrice}`}>
                €{discountedPrice.toFixed(2)}
              </p>
            )}
            <p
              className={`${css.price} ${discountedPrice ? css.oldPrice : ""}`}
            >
              €{product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </a>
    );
  }
);

export default ProductCard;
