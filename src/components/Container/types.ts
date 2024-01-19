export interface Product {
  id: number;
  discount_percentage: number;
  image: string;
  title: string;
  summary: string;
  price: number;
  product_url: string;
}
export type City = [number, string];
export type CountryLocations = {
  [key: string]: City[];
};
