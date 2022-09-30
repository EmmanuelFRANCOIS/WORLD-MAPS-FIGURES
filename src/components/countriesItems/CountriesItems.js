import React, { useEffect, useState, useContext } from 'react';

import config from "../../helpers/config.json";

import { DataContext } from '../../App';

import { useTranslation } from "react-i18next";

import { dataSorter, getTransCode }     from "../../helpers/i18next";

import CountryItem from "../countriesItem/CountriesItem";

const CountriesItems = ({ zoomLevel }) => {

  const { t } = useTranslation();

  // Get Translation code (to be used in RESTCountries translations)
  const transCode = getTransCode();
  
  // Get Countries data from Context
  const data = useContext(DataContext);
  data.sort( dataSorter );

  // Flags height and Label font size
  const [flagsHeight, setFlagsHeight] = useState(
    ( config.countryItems.flagsHeightMin 
      + (config.countryItems.flagsHeightMax - config.countryItems.flagsHeightMin) * zoomLevel
    ).toFixed(0)
  );
  const [labelFontSize, setLabelFontSize] = useState(
    ( config.countryItems.labelFontSizeMin 
      + (config.countryItems.labelFontSizeMax - config.countryItems.labelFontSizeMin) * zoomLevel
    ).toFixed(2)
  );

  // We recalculate flagsHeight each time zoomLevel is updated
  useEffect( ()=>{

    // Update Page title
    document.title = t("CountriesList") + " - " + t("appName");

    setFlagsHeight(
      ( config.countryItems.flagsHeightMin 
        + (config.countryItems.flagsHeightMax - config.countryItems.flagsHeightMin) * zoomLevel
      ).toFixed(0)
    );
    setLabelFontSize(
      ( config.countryItems.labelFontSizeMin 
        + (config.countryItems.labelFontSizeMax - config.countryItems.labelFontSizeMin) * zoomLevel
      ).toFixed(2)
    );
  }, [t, zoomLevel])

  return (
    <div className="w-100 p-2 countriesItems">
    {
      data
      .map((country, index) => {
        return <CountryItem key={index} country={country} transCode={transCode}
                            flagsHeight={flagsHeight} 
                            labelFontSize={labelFontSize} />
      })
    }
    </div>
  );

};

export default CountriesItems;