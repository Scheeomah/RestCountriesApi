import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiURL } from "../util/api";

const CountryInfo = () => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { countryName } = useParams();

 

  useEffect(() => {
    const getCountryByName = async () => {
        try {
          const res = await fetch(`${apiURL}/name/${countryName}`);
          if (!res.ok) throw new Error("Could not find!");
    
          const data = await res.json();
          setCountry(data[0]); // Store first country object
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
    getCountryByName();
  }, [countryName]);

  return (
    <div className="country_info_wrapper">
      <button>
        <Link to="/">Back</Link>
      </button>

      {
        
      }

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {country && (
        <div className="country_info_container">
          <div className="country_info-img">
            <img src={country.flags?.png} alt={country.name?.common} />
          </div>

          <div className="country_info">
            <h3>{country.name?.common}</h3>

            <div className="country_info-left">
              <h5>Native Name: <span></span></h5>
              <h5>Population: <span>{country.population.toLocaleString()}</span></h5>
              <h5>Region: <span>{country.region}</span></h5>
              <h5>Sub Region: <span>{country.subregion}</span></h5>
              <h5>Capital: <span>{country.capital}</span></h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
