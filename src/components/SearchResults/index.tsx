import css from "./style.module.css";

import ProductCard from "../ProductCard";
import { SearchResultProps } from "./types";

export default function SearchResults({ products }: SearchResultProps) {
  const isMobile = window.innerWidth < 768;

  return (
    <div className={css.cardContainer}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isMobile={isMobile} />
      ))}
    </div>
  );
}
