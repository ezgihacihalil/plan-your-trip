import css from "./style.module.css";

import ProductCard from "../ProductCard";
import { Product } from "../Container/types";

interface SearchResultProps {
  products: Product[];
}

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
