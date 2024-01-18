import css from "./style.module.css";
import { Product } from "../Container";

interface SearchResultProps {
  products: Product[];
}

export default function SearchResults({ products }: SearchResultProps) {
  const isMobile = window.innerWidth < 768;

  const aspectRatio = isMobile ? "3:4" : "2:3";
  const imageHeight = isMobile ? "196" : "396";
  const fit = isMobile ? "crop" : "fill";

  return (
    <div className={css.cardContainer}>
      {products.map((product) => {
        const discountedPrice = product.discount_percentage
          ? product.price - (product.price * product.discount_percentage) / 100
          : null;

        const imageUrl = new URL(product.image);
        const params = new URLSearchParams(imageUrl.search);
        params.set("fit", fit);
        params.set("ar", aspectRatio);
        params.set("h", imageHeight);
        imageUrl.search = params.toString();

        const finalImageUrl = `${imageUrl.origin}${
          imageUrl.pathname
        }${decodeURIComponent(imageUrl.search)}`;
        console.log(finalImageUrl);

        return (
          <a href={product.product_url} key={product.id} className={css.card}>
            <div className={css.imageContainer}>
              <img
                className={css.image}
                src={finalImageUrl}
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
                  className={`${css.price} ${
                    discountedPrice ? css.oldPrice : ""
                  }`}
                >
                  €{product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
