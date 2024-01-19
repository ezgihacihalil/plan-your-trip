import { render } from "@testing-library/react";
import { productData } from "../../../fixtures/products";
import ProductCard from "../index";

describe("ProductCard", () => {
  it("renders correctly", () => {
    const product = productData[0];

    const { getByText, getByAltText } = render(
      <ProductCard product={product} isMobile={false} />
    );

    expect(getByText("Disneyland Paris: Skip The Line")).toBeInTheDocument();
    expect(getByAltText(product.title)).toHaveAttribute(
      "src",
      "https://aws-tiqets-cdn.imgix.net/images/content/9da74e3fa6d14469ae8ea2ba6da6117a.png?auto=format&fit=fill&ixlib=python-1.1.2&q=70&s=47c3d176dea82b7293edec297b94e8c4&ar=2:3&h=396"
    );
    expect(getByText("€70.30")).toBeInTheDocument();
    expect(getByText("€74.00")).toHaveClass("oldPrice");
  });
});
