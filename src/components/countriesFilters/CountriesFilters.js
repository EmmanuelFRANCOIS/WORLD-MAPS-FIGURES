import React, { useState } from "react";

import config from "../../helpers/config.json";

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const CountriesFilters = ({ sendFiltersToParent }) => {

  const { t } = useTranslation();

  const [zoomLevel, setZoomLevel] = useState(config.countryFlags.zoomLevelDefault);

  const updateZoomLevel = (zoomLevel) => {
    setZoomLevel(zoomLevel);
    sendFiltersToParent(zoomLevel);
  };

  return (
    <div className="filters">
      <div className="filter">
        <div className="mb-2 text-uppercase text-light">{t("ZoomLevel")}</div>
        <div className="d-flex justify-content-stretch">
          <input type="range" name="zoomLevel" 
                className="w-100"
                min={0} 
                max={1} 
                step={config.countryFlags.zoomLevelStep} 
                value={zoomLevel} 
                onChange={(e) => updateZoomLevel(e.target.value)} />
          <button className="btn btn-primary py-1 px-2 ms-4 text-white"
                  onClick={ () => updateZoomLevel(config.countryFlags.zoomLevelDefault) }>
            <FontAwesomeIcon className="fw-bold" icon={solid('arrow-rotate-left')} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountriesFilters;
