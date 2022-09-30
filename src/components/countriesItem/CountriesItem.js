import React from 'react';
import { Link } from 'react-router-dom';

const CountriesItem = ({ country, transCode, flagsHeight, labelFontSize }) => {

  const countryName = transCode === 'eng' || country.translations[transCode].common === undefined
                      ? country.name.common
                      : country.translations[transCode].common;

  return (
    <Link to={"/country/" + country.cca3} className="d-flex countryItem">
      <div className="flag">
        <img src={country.flags.svg} height={flagsHeight} alt={"drapeau-" + countryName} />
      </div>
      <h3 style={{fontSize: labelFontSize + 'rem'}}>{countryName}</h3>
    </Link>
  );

};

export default CountriesItem;