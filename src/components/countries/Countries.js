import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import Offcanvas from 'react-bootstrap/Offcanvas';
import CloseButton from 'react-bootstrap/CloseButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import { useTranslation } from "react-i18next";

import config from "../../helpers/config.json";

import CountriesFilters from "../countriesFilters/CountriesFilters";
import CountriesFlags   from "../countriesFlags/CountriesFlags";
import CountriesItems   from "../countriesItems/CountriesItems";
import CountriesTable   from "../countriesTable/CountriesTable";

const Countries = ( {data} ) => {

  const { t } = useTranslation();

  // Offcanvas button
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  // Rendering Template
  const [template, setTemplate] = useState(config.countries.defaultTemplate);
  const [zoomLevel, setZoomLevel] = useState(config.countryFlags.zoomLevelDefault);

  // Function to apply Filters
  const applyFilters = (zoomLevel) => {
    setZoomLevel(zoomLevel);
  }

  // Setup view title
  const [title, setTitle] = useState();
  useEffect( () => {
    switch (template) {
      case 'flags':
        setTitle(t("CountriesFlags"));
        break;
      case 'list':
        setTitle(t("CountriesList"));
        break;
      case 'table':
        setTitle(t("CountriesTable"));
        break;
      default:
        setTitle(t("CountriesList"));
        break;
    }
  }, [t, template])
  

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-secondary text-white shadow-lg countriesBar">
        <h1 className="pe-2 py-2 m-0 lh-1 fs-2 fw-bold text-uppercase"><small>{title}</small></h1>
        <ButtonGroup className="ms-auto me-5">
          <ToggleButton type="radio" id="radTemplateFlags" name="radTemplate" value={"flags"} variant={'outline-primary'}
                        className="btn btn-info text-uppercase fw-bold text-light"
                        checked={template === 'flags'}
                        onChange={(e) => setTemplate(e.currentTarget.value)}>
            {t("Flags")}
          </ToggleButton>
          <ToggleButton type="radio" id="radTemplateList" name="radTemplate" value={"list"} variant={'outline-primary'}
                        className="btn btn-info text-uppercase fw-bold text-light"
                        checked={template === 'list'}
                        onChange={(e) => setTemplate(e.currentTarget.value)}>
            {t("List")}
          </ToggleButton>
          <ToggleButton type="radio" id="radTemplateTable" name="radTemplate" value={"table"} variant={'outline-primary'}
                        className="btn btn-info text-uppercase fw-bold text-light"
                        checked={template === 'table'}
                        onChange={(e) => setTemplate(e.currentTarget.value)}>
            {t("Table")}
          </ToggleButton>
        </ButtonGroup>
        <button type="button" onClick={toggleShow} className="btn py-1 ps-4 pe-2">
          <FontAwesomeIcon className="fs-3 fw-bold text-white" icon={solid('ellipsis-vertical')} />
        </button>
        <Offcanvas show={show} onHide={handleClose} placement={'end'}
                   scroll={false} backdrop={true}
                   className="bg-primary offCanvas">
          <Offcanvas.Header className="pe-3 text-center">
            <Offcanvas.Title className="mx-auto text-uppercase text-white">
            {t("Options")}
            </Offcanvas.Title>
            <CloseButton onClick={handleClose} variant="white" />
          </Offcanvas.Header>
          <Offcanvas.Body>
            <CountriesFilters sendFiltersToParent={applyFilters} 
                              className="bg-info"/>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <div>
        {
          template === 'flags' 
          ? <CountriesFlags zoomLevel={zoomLevel} />
          : template === 'list'
          ? <CountriesItems zoomLevel={zoomLevel} />
          : <CountriesTable zoomLevel={zoomLevel} />
        }
      </div>
    </>
  );
};

export default Countries;
