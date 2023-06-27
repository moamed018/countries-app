import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";

const CountryPage = () => {
    const param = useParams();
    const apiUrl = `https://restcountries.com/v3.1/alpha/${param.countryCca2}`;
    // console.log(param);

    const [countryCode, setCountryCode] = useState([]);
    const [bordersCountries, setBordersCountries] = useState([]);
    const [isPSE, setIsPSE] = useState(false);

    useEffect(() => {
        if (
            param.countryCca2.toLowerCase() === "il" ||
            param.countryCca2.toLowerCase() === "isr" ||
            param.countryCca2.toLowerCase() === "376"
        ) {
            setIsPSE(true);
            fetch("https://restcountries.com/v3.1/alpha/PSE")
                .then((res) => res.json())
                .then((data) => {
                    setCountryCode(data);

                    document.title = `Countries App | ${data[0].name.common}`;

                    const bor = data[0].borders.join(",");
                    // console.log(bor);

                    return fetch(
                        `https://restcountries.com/v3.1/alpha?codes=${bor}`
                    );
                })
                .then((res) => res.json())
                .then((data) => setBordersCountries(data));
        } else {
            setIsPSE(false);
            fetch(apiUrl)
                .then((res) => res.json())
                .then((data) => {
                    setCountryCode(data);

                    document.title = `Countries App | ${data[0].name.common}`;

                    const bor = data[0].borders.join(",");
                    // console.log(bor);

                    return fetch(
                        `https://restcountries.com/v3.1/alpha?codes=${bor}`
                    );
                })
                .then((res) => res.json())
                .then((data) => setBordersCountries(data));
        }
    }, [apiUrl, param.countryCca2]);
    // console.log(countryCode);
    // console.log(bordersCountries);

    return (
        <div className="details container my-5">
            {countryCode.length === 0 ? <Spinner /> : null}

            {countryCode.length > 0 &&
                countryCode.map((coun) => {
                    return (
                        <div className="country" id={coun.cca2} key={coun.cca2}>
                            <Link
                                to={"/"}
                                className="btn btn-light text fw-bolder shadow bg-fff btn-back"
                            >
                                &larr; Back To Home
                            </Link>

                            {isPSE && (
                                <p className="is_pse">
                                    <span className="isr">Israel</span> is
                                    nothing <br /> This is{" "}
                                    <span className="pse">Palestine</span>
                                </p>
                            )}

                            <div className="content mt-5 pt-4 d-flex justify-content-between flex-column flex-md-row gap-5">
                                <div className="image col-md-5 col-12 shadow">
                                    <img
                                        className="w-100 h-100"
                                        src={coun.flags.png}
                                        alt={coun.cca2}
                                    />
                                </div>
                                <div className="text col-md-6 col-12 align-self-center">
                                    <h3 className="fs-2 fw-bolder mb-4">
                                        {coun.name.common}
                                    </h3>

                                    <div className="info d-flex justify-content-between flex-md-row flex-column gap-md-2 gap-5 mb-5">
                                        <ul className="list-group list-group-flush left-info">
                                            <li className="list-group-item ps-1 mb-2 pb-1">
                                                <span className="fw-bold">
                                                    Native Name:{" "}
                                                </span>
                                                <span>
                                                    {
                                                        coun.name.nativeName[
                                                            Object.keys(
                                                                coun.name
                                                                    .nativeName
                                                            )[0]
                                                        ].official
                                                    }
                                                </span>
                                            </li>

                                            <li className="list-group-item ps-1 mb-2 pb-1">
                                                <span className="fw-bold">
                                                    Population:{" "}
                                                </span>
                                                <span>
                                                    {new Intl.NumberFormat(
                                                        "en-US"
                                                    ).format(coun.population)}
                                                </span>
                                            </li>

                                            <li className="list-group-item ps-1 mb-2 pb-1">
                                                <span className="fw-bold">
                                                    Region:{" "}
                                                </span>
                                                <span>{coun.region}</span>
                                            </li>

                                            <li className="list-group-item ps-1 mb-2 pb-1">
                                                <span className="fw-bold">
                                                    Sub Region:{" "}
                                                </span>
                                                <span>{coun.subregion}</span>
                                            </li>

                                            <li className="list-group-item ps-1 mb-2 pb-1">
                                                <span className="fw-bold">
                                                    Capital:{" "}
                                                </span>
                                                <span>
                                                    {coun.capital.join(", ")}
                                                </span>
                                            </li>
                                        </ul>

                                        <ul className="list-group list-group-flush right-info">
                                            <li className="list-group-item ps-1 mb-2 pb-1">
                                                <span className="fw-bold">
                                                    Top Level Domain:{" "}
                                                </span>
                                                <span>{coun.tld[0]}</span>
                                            </li>

                                            <li className="list-group-item ps-1 mb-2 pb-1">
                                                <span className="fw-bold">
                                                    Currencies:{" "}
                                                </span>
                                                <span>
                                                    {Object.values(
                                                        coun.currencies
                                                    ).map((curr) => {
                                                        return (
                                                            <span
                                                                key={curr.name}
                                                            >{`${curr.name}(${curr.symbol}) `}</span>
                                                        );
                                                    })}
                                                </span>
                                            </li>

                                            <li className="list-group-item ps-1 mb-2 pb-1">
                                                <span className="fw-bold">
                                                    Languages:{" "}
                                                </span>
                                                <span>
                                                    {Object.values(
                                                        coun.languages
                                                    )
                                                        .sort()
                                                        .join(", ")}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="borders pt-1 d-flex align-items-start flex-md-row flex-column align-items-md-center gap-md-2 gap-m-4 gap-3">
                                        <span className="fw-bold me-2">
                                            Border Countries:{" "}
                                        </span>
                                        <div className="links-borders d-flex flex-wrap gap-2 justify-content-start justify-content-md-center ps-md-0 ps-4">
                                            {bordersCountries.length === 0 ? (
                                                <span>
                                                    No Borders Countries
                                                </span>
                                            ) : null}
                                            {bordersCountries.map((border) => {
                                                return (
                                                    border.cca2.toLowerCase() !==
                                                        "il" && (
                                                        <Link
                                                            to={`/countries/${border.cca2}`}
                                                            className="btn btn-light text fw-bolder shadow bg-fff col-4 col-md-5 btn-border"
                                                            key={border.cca2}
                                                            id={border.cca2}
                                                        >
                                                            {border.name.common}
                                                        </Link>
                                                    )
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
    // countryCode !== {} && <h1>Hi {countryCode.name.official}</h1>
};

export default CountryPage;
