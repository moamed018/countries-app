import React, { useEffect, useState } from "react";
import Country from "./Country";
import Spinner from "./Spinner";

const Home = () => {
    const apiUrl = "https://restcountries.com/v3.1";
    const [searchValue, setSearchValue] = useState("");
    const [regionValue, setRegionValue] = useState("title");
    const [error, setError] = useState(false);

    const [countries, setCountries] = useState([]);
    const [pse, setPSE] = useState({});

    const getAllCountries = () => {
        fetch(`${apiUrl}/all`)
            .then((res) => res.json())
            .then((data) => setCountries(data));
    };

    const getAllCountriesBySearch = (val) => {
        fetch(`${apiUrl}/name/${val}`)
            .then((res) => res.json())
            // .then((data) => setCountries(data))
            .then((data) => {
                if (data.status === 404) throw new Error("404 Error");

                setError(false);
                return setCountries(data);
            })
            .catch((err) => setError(true));
    };

    const getAllCountriesByRegion = (val) => {
        fetch(`${apiUrl}/region/${val}`)
            .then((res) => res.json())
            .then((data) => setCountries(data));
    };

    useEffect(() => {
        //   getAllCountries();
        document.title = `Countries App`;

        fetch("https://restcountries.com/v3.1/alpha/PSE")
            .then((res) => res.json())
            .then((data) => {
                setPSE(data[0]);
            });
    }, []);

    const searchChangeHandler = (e) => {
        setSearchValue(e.target.value);
        setRegionValue("title");
    };

    const regionChangeHandler = (e) => {
        setRegionValue(e.target.value);
        setSearchValue("");
    };

    useEffect(() => {
        setCountries([]);
        const timer = setTimeout(() => {
            if (searchValue !== "") {
                getAllCountriesBySearch(searchValue);
                console.log(searchValue);
            } else {
                setError(false);
                getAllCountries();
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchValue]);

    useEffect(() => {
        setCountries([]);
        const timer = setTimeout(() => {
            if (regionValue === "all") {
                getAllCountries();
            }
            if (regionValue !== "title" && regionValue !== "all") {
                getAllCountriesByRegion(regionValue);
                console.log(regionValue);
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [regionValue]);

    return (
        <div className="">
            <div className="container py-5">
                <form className="d-flex justify-content-between flex-column flex-md-row gap-4">
                    <input
                        type="search"
                        id="search-input"
                        className="pe-2 shadow bg-fff"
                        style={{
                            paddingLeft: "4rem",
                            paddingTop: "0.7rem",
                            paddingBottom: "0.7rem",
                        }}
                        placeholder="Search for a country..."
                        value={searchValue}
                        onChange={(event) => {
                            searchChangeHandler(event);
                        }}
                    />

                    <select
                        className="form-select text fw-semibold shadow bg-fff"
                        aria-label="Default select example"
                        name="region"
                        // defaultValue="one"
                        value={regionValue}
                        onChange={(e) => {
                            regionChangeHandler(e);
                        }}
                    >
                        <option disabled value="title">
                            Filter by Region
                        </option>
                        <option className="bg-fff fw-semibold" value="all">
                            All
                        </option>
                        <option className="bg-fff fw-semibold" value="africa">
                            Africa
                        </option>
                        <option className="bg-fff fw-semibold" value="america">
                            America
                        </option>
                        <option className="bg-fff fw-semibold" value="asia">
                            Asia
                        </option>
                        <option className="bg-fff fw-semibold" value="europe">
                            Europe
                        </option>
                        <option className="bg-fff fw-semibold" value="oceania">
                            Oceania
                        </option>
                    </select>
                </form>

                <ul
                    className="row py-5 home-page"
                    style={{ gap: "3rem 0rem", paddingLeft: 0 }}
                >
                    {countries.length === 0 && !error ? <Spinner /> : null}

                    {error ? (
                        <p className="text-center fs-4">Not Found Country</p>
                    ) : null}

                    {countries.map((country) => {
                        const idCountry = `${country.cca2}`;

                        if (country.name.common.toLowerCase() === "israel") {
                            country = pse;
                        }
                        return (
                            <li
                                key={idCountry}
                                id={idCountry}
                                className="col-lg-3 col-md-4 col-sm-6"
                            >
                                <Country country={country} to={idCountry} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Home;
