import React, { useContext } from "react";
import { useParams } from 'react-router-dom'
//import config from "../../helpers/config.json";

import { useTranslation } from "react-i18next";
import { getTransCode }   from "../../helpers/i18next";

import { DataContext } from '../../App';

//import { config } from "@fortawesome/fontawesome-svg-core";


const Country = ( props ) => {

  const { t } = useTranslation();
  // Get Translation code (to be used in RESTCountries translations)
  const transCode = getTransCode();

  const { cca3 }  = useParams();
  const data      = useContext( DataContext );
  const country   = data.find( obj => {
                      return obj.cca3 === cca3
                    });
  let border = "";
                    
  const countryName = transCode ==="eng" 
                    ? country.name.common + ' (' + country.name.official + ')' 
                    : country.translations[transCode].common + ' (' + country.translations[transCode].official + ')';

  return (
    <div className="container-fluid p-0 m-0 bg-light">
      <div className="d-flex justify-content-between align-items-center px-4 py-3 bg-secondary text-white shadow-lg countriesBar">
        <h1 className="pe-2 py-2 m-0 lh-1 fs-2 fw-bold text-uppercase">{countryName}</h1>
      </div>
      <div className="d-flex flex-column px-4 py-4 gap-4 countrySheet">

        <div className="d-flex justify-content-between gap-4">

          {/* Country Codes */}
          <div className="col px-3 py-2 shadow rounded-3 bg-white">
            <h4 className="text-primary fw-bold text-uppercase">{t("countryCodes")}</h4>
            <div className="row py-1 border-bottom border-top border-light">
              <label className="col-12 col-sm-4 col-md-3">{t("cca2")}</label>
              <div className="col fw-bold text-black">{country.cca2}</div>
            </div>
            <div className="row py-1 border-bottom border-light">
              <label className="col-12 col-sm-4 col-md-3">{t("cca3")}</label>
              <div className="col fw-bold text-black">{country.cca3}</div>
            </div>
            <div className="row py-1 border-bottom border-light">
              <label className="col-12 col-sm-4 col-md-3">{t("ccn3")}</label>
              <div className="col fw-bold text-black">{country.ccn3}</div>
            </div>
            <div className="row py-1 border-bottom border-light">
              <label className="col-12 col-sm-4 col-md-3">{t("cioc")}</label>
              <div className="col fw-bold text-black">{country.cioc}</div>
            </div>
          </div>

          {/* Country Names */}
          <div className="col px-3 py-2 shadow rounded-3 bg-white">
            <h4 className="text-primary fw-bold text-uppercase">{t("countryNames")}</h4>
            <div className="row py-1 border-bottom border-top border-light">
              <label className="col-12 col-sm-5 col-md-5">{t("EnglishCommonName")}</label>
              <div className="col fw-bold text-black">{country.name.common}</div>
            </div>
            <div className="row py-1 border-bottom border-light">
              <label className="col-12 col-sm-5 col-md-5">{t("EnglishOfficialName")}</label>
              <div className="col fw-bold text-black">{country.name.official}</div>
            </div>
            <div className="row py-1 border-bottom border-light">
              <label className="col-12 col-sm-5 col-md-5">{t("NativeCommonName")}</label>
              <div className="col fw-bold text-black">{country.name.nativeName[Object.keys(country.name.nativeName)[0]].common}</div>
            </div>
            <div className="row py-1 border-bottom border-light">
              <label className="col-12 col-sm-5 col-md-5">{t("NativeOfficialName")}</label>
              <div className="col fw-bold text-black">{country.name.nativeName[Object.keys(country.name.nativeName)[0]].official}</div>
            </div>
          </div>

          {/* Symbols */}
          <div className="col px-3 py-2 shadow rounded-3 bg-white">
            <h4 className="text-primary fw-bold text-uppercase">{t("symbols")}</h4>
            <div className="row my-3">
              <div className="col text-center">
                <img className="d-block border border-secondary shadow mx-auto" src={country.flags.svg} height="84" alt="" />
                <label className="fw-bold fs-5">{t("Flag")}</label>
              </div>
              <div className="col text-center">
                <img className="d-block border border-secondary shadow mx-auto" src={country.coatOfArms.svg} height="84" alt="" />
                <label className="fw-bold fs-5">{t("coatOfArms")}</label>
              </div>
            </div>
          </div>

        </div>

        <div className="d-flex justify-content-between gap-4">

          <div className="col-3 d-flex flex-column gap-4">

            {/* Region */}
            <div className="col px-3 py-2 shadow rounded-3 bg-white">
              <h4 className="text-primary fw-bold text-uppercase">{t("region")}</h4>
              <div className="row py-1 border-bottom border-top border-light">
                <label className="col-12 col-sm-4 col-md-3">{t("Region")}</label>
                <div className="col fw-bold text-black">{country.region}</div>
              </div>
              <div className="row py-1 border-bottom border-top border-light">
                <label className="col-12 col-sm-4 col-md-3">{t("Subregion")}</label>
                <div className="col fw-bold text-black">{country.subregion}</div>
              </div>
           </div>

            {/* Borders */}
            {
              country.borders !== undefined ?
              ( <div className="col px-3 py-2 shadow rounded-3 bg-white">
                <h4 className="text-primary fw-bold text-uppercase">{t("borders")}</h4>
                { country.borders.map( (cca3) => {
                  border = data.find( obj => { return obj.cca3 === cca3 } )
                  return <div className="row py-1 border-bottom border-top border-light">
                          <label className="col-12 col-sm-4 col-md-3">{cca3}</label>
                          <div className="col fw-bold text-black">
                            { transCode === "eng" ? border.name.common : border.translations[transCode].common}
                          </div>
                        </div>
                  }) }
                </div>
              ) 
              : null
            }

            {/* Demonyms */}
            <div className="col px-3 py-2 shadow rounded-3 bg-white">
              <h4 className="text-primary fw-bold text-uppercase">{t("demonyms")}</h4>
              {
                Object.keys(country.demonyms).map( (lng) => {
                  return <div className="row py-1 border-bottom border-top border-light">
                          <label className="col-12 col-sm-4 col-md-3">{lng}</label>
                          <div className="col fw-bold text-black">{country.demonyms[lng].f}</div>
                          <div className="col fw-bold text-black">{country.demonyms[lng].m}</div>
                        </div>
                })
              }
            </div>

            {/* Spoken Languages */}
            <div className="col px-3 py-2 shadow rounded-3 bg-white">
              <h4 className="text-primary fw-bold text-uppercase">{t("spokenLanguages")}</h4>
              {
                Object.keys(country.languages).map( (lng) => {
                  return <div className="row py-1 border-bottom border-top border-light">
                          <label className="col-12 col-sm-4 col-md-3">{lng}</label>
                          <div className="col fw-bold text-black">{country.languages[lng]}</div>
                        </div>
                })
              }
            </div>

            {/* Currencies */}
            <div className="col px-3 py-2 shadow rounded-3 bg-white">
              <h4 className="text-primary fw-bold text-uppercase">{t("currencies")}</h4>
              {
                Object.keys(country.currencies).map( (cur) => {
                  return <div className="row py-1 border-bottom border-top border-light">
                          <label className="col-12 col-sm-4 col-md-3">{cur}</label>
                          <div className="col fw-bold text-black">{country.currencies[cur].name}</div>
                          <div className="col fw-bold text-black">{country.currencies[cur].symbol}</div>
                        </div>
                })
              }
            </div>

          </div>
        
          {/* Country Names translations */}
          <div className="col px-3 py-2 shadow rounded-3 bg-white">
            <h4 className="text-primary fw-bold text-uppercase">{t("countryNamesTranslation")}</h4>
            {
              Object.keys(country.translations).map( (lng) => {
                return <div className="row py-1 border-bottom border-top border-light">
                         <label className="col-12 col-sm-4 col-md-3">{lng}</label>
                         <div className="col fw-bold text-black">{country.translations[lng].common}</div>
                         <div className="col fw-bold text-black">{country.translations[lng].official}</div>
                       </div>
              })
            }
          </div>
        
        </div>

      </div>
      
    </div>
  );

};

export default Country;
