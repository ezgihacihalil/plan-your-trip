import React, { useState } from "react";
import Filter from "../Filter";
import css from "./style.module.css";
import DateSelection from "../DateSelection";
import useFetch from "../../hooks/useFetch";

const Container: React.FC = () => {
  const {
    data: locations,
    isLoading,
    error,
  } = useFetch("http://localhost:3001/locations", []);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  console.log(locations, country);
  console.log(Object.keys(locations).length ? locations[country] : "dsfsf");

  const handleCountryChange = (country: string) => {
    setCountry(country);
  };

  const handleCityChange = (city: string) => {
    setCity(city);
  };

  return (
    <div className={css.container}>
      <Filter
        options={Object.keys(locations)}
        label="Country"
        onChange={handleCountryChange}
      />
      <Filter
        options={country ? locations[country] : []}
        label="City"
        onChange={handleCityChange}
        disabled={country === ""}
      />
      <DateSelection disabled={!country || !city} />

      {!country && (
        <div className={css.selectFilterText}>Select filters first</div>
      )}
    </div>
  );
};

export default Container;
