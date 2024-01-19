import { generateImageUrl, calculateDiscountedPrice } from "../utils";

describe("generateImageUrl", () => {
  it("generates the correct image URL for mobile", () => {
    const image = "https://example.com/image.jpg";
    const result = generateImageUrl(image, true);

    expect(result).toBe("https://example.com/image.jpg?fit=crop&ar=3:4&h=196");
  });

  it("generates the correct image URL for desktop", () => {
    const image = "https://example.com/image.jpg";
    const result = generateImageUrl(image, false);

    expect(result).toBe("https://example.com/image.jpg?fit=fill&ar=2:3&h=396");
  });
});

describe("calculateDiscountedPrice", () => {
  it("calculates the correct discounted price", () => {
    const price = 100;
    const discountPercentage = 20;
    const result = calculateDiscountedPrice(price, discountPercentage);

    expect(result).toBe(80);
  });

  it("returns the original price when the discount is 0", () => {
    const price = 100;
    const discountPercentage = 0;
    const result = calculateDiscountedPrice(price, discountPercentage);

    expect(result).toBe(price);
  });

  it("returns 0 when the discount is 100", () => {
    const price = 100;
    const discountPercentage = 100;
    const result = calculateDiscountedPrice(price, discountPercentage);

    expect(result).toBe(0);
  });
});
