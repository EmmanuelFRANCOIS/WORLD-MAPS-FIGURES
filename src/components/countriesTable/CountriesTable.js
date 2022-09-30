import React, { useContext, useEffect } from 'react';

import GenCountriesTable from '../../helpers/GenCountriesTable';

//import config from "../../helpers/config.json";

import { DataContext } from '../../App';

import { useTranslation } from "react-i18next";

const CountriesTable = ({ zoomLevel }) => {

  const { t } = useTranslation();

  // Get Countries data from Context
  const data = useContext(DataContext);

  useEffect( ()=>{
  
    // Update Page title
    document.title = t("CountriesTable") + " - " + t("appName");

  }, [t, zoomLevel])

  return (
      <GenCountriesTable data={data} />
  );

};

export default CountriesTable;