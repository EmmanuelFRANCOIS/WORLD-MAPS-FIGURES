import React from 'react';
import { Link } from 'react-router-dom';

const CountriesFlag = ({ country, transCode, flagsHeight, labelFontSize }) => {

  const countryName = transCode === 'eng' || country.translations[transCode].common === undefined
                      ? country.name.common
                      : country.translations[transCode].common;

  return (
    <div className='countryFlag'>
      <img src={country.flags.svg} height={flagsHeight} alt={"flag" + countryName} />
      <Link to={"/country/" + country.cca3} className="infos">
        <h3 style={{fontSize: labelFontSize + 'rem'}}>{countryName}</h3>
      </Link>
    </div>
  );

};

export default CountriesFlag;