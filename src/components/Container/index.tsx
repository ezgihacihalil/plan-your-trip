import React, { useState } from "react";
import Filter from "../Filter";
import css from "./style.module.css";
import DateSelection from "../DateSelection";
import useFetch from "../../hooks/useFetch";
import SearchResults from "../SearchResults";
import { LOCATIONS_URL, PRODUCTS_URL } from "./constants";

export interface Product {
  id: number;
  discount_percentage: number;
  image: string;
  title: string;
  summary: string;
  price: number;
  product_url: string;
}
export type Location = [number, string];
export type CountryLocations = Record<string, Location[]>;

const Container: React.FC = () => {
  const {
    data: locations,
    loading: locationsLoading,
    error: locationsError,
  } = useFetch<{ [key: string]: CountryLocations }>(LOCATIONS_URL);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState<string>("");

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useFetch<Product[]>(
    // @ts-ignore
    city && date ? `${PRODUCTS_URL}?date=${date}&city_id=${Number(city)}` : null
  );

  const handleCountryChange = (country: string) => {
    setCountry(country);
  };

  const handleCityChange = (city: string) => {
    setCity(city);
  };

  if (locationsError || productsError) {
    return <div>Error loading data</div>;
  }

  // if (locationsLoading || productsLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={css.pageWrapper}>
      <div className={css.container}>
        <div className={css.filterContainer}>
          <Filter
            options={Object.keys(locations ?? {})}
            label="Country"
            onChange={handleCountryChange}
          />
          <Filter
            // @ts-ignore
            options={(country && locations ? locations[country] : []) ?? []}
            label="City"
            onChange={handleCityChange}
            disabled={country === ""}
            isCity
          />
        </div>
        <DateSelection setDate={setDate} disabled={!country || !city} />

        {(!country || !city || !date) && (
          <div className={css.selectFilterText}>Select filters first</div>
        )}
        {products && <SearchResults products={products} />}

        {date && !products && (
          <div className={css.noResults}>
            Nothing found, please try a different date
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
