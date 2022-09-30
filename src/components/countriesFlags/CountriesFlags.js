import React, { useEffect, useState, useContext } from 'react';

import config from "../../helpers/config.json";

import { DataContext } from '../../App';

import { useTranslation } from "react-i18next";

import { dataSorter, getTransCode }     from "../../helpers/i18next";

import CountryFlag from "../countriesFlag/CountriesFlag";

const CountriesFlags = ({ zoomLevel }) => {

  const { t } = useTranslation();

  // Get Translation code (to be used in RESTCountries translations)
  const transCode = getTransCode();
  
  // Get Countries data from Context
  const data = useContext(DataContext);
  data.sort( dataSorter );

  // Flags height and Label font size
  const [flagsHeight, setFlagsHeight] = useState(
    ( config.countryFlags.flagsHeightMin 
      + (config.countryFlags.flagsHeightMax - config.countryFlags.flagsHeightMin) * zoomLevel
    ).toFixed(0)
  );
  const [labelFontSize, setLabelFontSize] = useState(
    ( config.countryFlags.flagsLabelFontSizeMin 
      + (config.countryFlags.flagsLabelFontSizeMax - config.countryFlags.flagsLabelFontSizeMin) * zoomLevel
    ).toFixed(2)
  );

  // We recalculate flagsHeight each time zoomLevel is updated
  useEffect( ()=>{
  
    // Update Page title
    document.title = t("CountriesFlags") + " - " + t("appName");

    setFlagsHeight(
      ( config.countryFlags.flagsHeightMin 
        + (config.countryFlags.flagsHeightMax - config.countryFlags.flagsHeightMin) * zoomLevel
      ).toFixed(0)
    );
    setLabelFontSize(
      ( config.countryFlags.flagsLabelFontSizeMin 
        + (config.countryFlags.flagsLabelFontSizeMax - config.countryFlags.flagsLabelFontSizeMin) * zoomLevel
      ).toFixed(2)
    );

  }, [t, zoomLevel])

  return (
    <div className="d-flex justify-content-between align-items-start flex-wrap p-2 countryFlags">
      {
        data
        .map((country, index) => {
          return <CountryFlag key={index} country={country} transCode={transCode}
                              flagsHeight={flagsHeight} 
                              labelFontSize={labelFontSize} />
        })
      }
    </div>
  );

};

export default CountriesFlags;