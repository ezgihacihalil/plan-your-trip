export function generateImageUrl(image: string, isMobile: boolean): string {
  const aspectRatio = isMobile ? "3:4" : "2:3";
  const imageHeight = isMobile ? "196" : "396";
  const fit = isMobile ? "crop" : "fill";

  const imageUrl = new URL(image);
  const params = new URLSearchParams(imageUrl.search);
  params.set("fit", fit);
  params.set("ar", aspectRatio);
  params.set("h", imageHeight);
  imageUrl.search = params.toString();

  return `${imageUrl.origin}${imageUrl.pathname}${decodeURIComponent(
    imageUrl.search
  )}`;
}

export function calculateDiscountedPrice(
  price: number,
  discountPercentage: number | null
): number | null {
  return discountPercentage ? price - (price * discountPercentage) / 100 : null;
}
