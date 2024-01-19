import { useState, useCallback } from "react";
import Filter from "../Filter";
import css from "./style.module.css";
import DateSelection from "../DateSelection";
import useFetch from "../../hooks/useFetch";
import SearchResults from "../SearchResults";
import { LOCATIONS_URL, PRODUCTS_URL } from "./constants";
import { CountryLocations, Product } from "./types";
import Loader from "../Loader";

export default function Container() {
  const {
    data: locations,
    loading: locationsLoading,
    error: locationsError,
  } = useFetch<CountryLocations>(LOCATIONS_URL);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");

  const shouldFetchProducts = city && date;
  const productsUrl = shouldFetchProducts
    ? `${PRODUCTS_URL}?date=${date}&city_id=${Number(city)}`
    : null;

  const fetchResult = useFetch<Product[]>(productsUrl || "");
  const products = productsUrl ? fetchResult.data : null;
  const productsLoading = productsUrl ? fetchResult.loading : false;
  const productsError = productsUrl ? fetchResult.error : null;

  const handleCountryChange = useCallback((country: string) => {
    setCountry(country);
  }, []);

  const handleCityChange = useCallback((city: string) => {
    setCity(city);
  }, []);

  if (locationsError || productsError) {
    return <div>Error</div>;
  }

  const filtersSelected = country && city && date;

  return (
    <div className={css.pageWrapper}>
      <div className={css.container}>
        <div className={css.filterContainer}>
          <Filter
            options={Object.keys(locations ?? {})}
            label="Country"
            onChange={handleCountryChange}
            disabled={locationsLoading || !locations}
          />
          <Filter
            options={country && locations ? locations[country] : []}
            label="City"
            onChange={handleCityChange}
            disabled={!country}
            isCity
          />
        </div>
        <DateSelection
          setDate={setDate}
          date={date}
          disabled={!country || !city}
        />
        <hr className={css.hrStyle} />

        {!filtersSelected && (
          <div className={css.selectFilterText}>Select filters first</div>
        )}
        {productsLoading && (
          <div className={css.loaderContainer}>
            <Loader color="#4e2870" duration={1} size={36} text="Loading..." />
          </div>
        )}
        {filtersSelected && products && <SearchResults products={products} />}
        {filtersSelected && (products?.length === 0) && (
          <div className={css.noResults}>
            Nothing found, please try a different date
          </div>
        )}
      </div>
    </div>
  );
}
