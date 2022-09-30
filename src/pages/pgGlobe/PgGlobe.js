import React, { useState, useRef } from 'react';

import config from "../../helpers/config.json";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Offcanvas from 'react-bootstrap/Offcanvas';
import CloseButton from 'react-bootstrap/CloseButton'

import { useTranslation } from "react-i18next";
import { SketchPicker } from "react-color";

import d3ProjList from '../../helpers/D3Projections.json';

import Header   from '../../components/header/Header';
import Footer   from '../../components/footer/Footer';
import Globe    from '../../components/globe/Globe';

const PgGlobe = () => {

  const { t } = useTranslation();

  // Offcanvas button
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  // Map
  const d3map = useRef();
  const [mapOptions, setMapOptions] = useState(config.map);
  const mapOptionsHandler = (prmName, val) => {
    setMapOptions({...mapOptions, [prmName]: val});
    // console.log('mapOptions', mapOptions);
  }
  const getPreviousProjection = () => {
    const selProj = document.getElementById('projectionSelect');
    if ( selProj.selectedIndex > 0 ) {
      // eslint-disable-next-line
      setMapOptions({...mapOptions, ['projection']: d3ProjList[selProj.selectedIndex - 1].code});
    }
  }
  const getNextProjection = () => {
    const selProj = document.getElementById('projectionSelect');
    console.log('selProj', selProj);
    if ( selProj.selectedIndex < d3ProjList.length - 1 ) {
      // eslint-disable-next-line
      setMapOptions({...mapOptions, ['projection']: d3ProjList[selProj.selectedIndex + 1].code});
    }
  }

  return (
    <div className="pgGlobe fullheight">
      <Header className="sticky-top pageHeader" />
      <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-secondary text-white shadow-lg sticky-top mapBar">
        <h1 className="pe-2 py-2 m-0 lh-1 fs-2 fw-bold text-uppercase"><small>{t("Map")}</small></h1>
        <div className="d-flex align-items-stretch">
          {/* Projection selector */}
          <label className="p-1 fs-5" htmlFor="projectionName">{t("Projection")}</label>
          <select name="projectionSelect" id="projectionSelect" className="btn btn-primary ms-2 py-1 fs-5 fw-bold text-start" 
                  value={mapOptions.projection} 
                  onChange={(e) => mapOptionsHandler('projection', e.target.value)} >
            { 
              d3ProjList.map( (prj, i) => {
                // if ( i === 0 || prj.group !== d3ProjList[i-1].group ) {
                //   return <optgroup key={i} label={prj.group}><option key={i} value={prj.code}>{prj.name}</option>;
                // }
                // return <option key={i} value={prj.code}>{prj.name}</option></optgroup>;
                return <option key={i} value={prj.code}>{prj.name}</option>
              })
            }
          </select>
          {/* Previous projection */}
          <button type="button" className="btn btn-seconday ms-2 py-0 px-1 fs-5"
                  onClick={() => getPreviousProjection()} >
            <FontAwesomeIcon className="fs-5 text-white" icon={solid('circle-left')} />
          </button>
          {/* Next projection */}
          <button type="button" className="btn btn-seconday ms-1 py-0 px-1 fs-5"
                  onClick={() => getNextProjection()} >
            <FontAwesomeIcon className="fs-5 text-white" icon={solid('circle-right')} />
          </button>
          {/* Reset Zoom */}
          <button type="button" onClick={() => d3map.current.resetZoom()} className="btn btn-primary py-1 ms-3 px-2">
            <FontAwesomeIcon className="fs-5 text-white" icon={solid('arrows-to-circle')} />
          </button>
          {/* Reset Rotation */}
          <button type="button" onClick={() => d3map.current.resetRotate()} className="btn btn-primary py-1 ms-2 px-2">
            <FontAwesomeIcon className="fs-5 text-white" icon={solid('arrows-rotate')} />
          </button>
          {/* Context Options menu */}
          <button type="button" onClick={toggleShow} className="btn btn-primary py-1 ms-3 px-3">
            <FontAwesomeIcon className="fs-4 fw-bold text-white" icon={solid('ellipsis-vertical')} />
          </button>
        </div>
        <Offcanvas show={show} onHide={handleClose} placement={'end'}
                  scroll={false} backdrop={false}
                  className="bg-primary offCanvas">
          <Offcanvas.Header className="pe-3 text-center">
            <Offcanvas.Title className="mx-auto text-uppercase text-white">
              {t("Options")}
            </Offcanvas.Title>
            <CloseButton onClick={handleClose} variant="white" />
          </Offcanvas.Header>
          <Offcanvas.Body>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <Globe ref={d3map} mapOptions={mapOptions} />
      <Footer className="sticky-bottom" />
    </div>
  );
};

export default PgGlobe;