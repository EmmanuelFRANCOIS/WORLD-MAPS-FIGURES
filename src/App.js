import React,
       { createContext }  from 'react';

import { BrowserRouter, 
         Routes, 
         Route }          from 'react-router-dom';

import { useQuery }       from 'react-query';
import axios              from 'axios';

import { dataSorter }     from "./helpers/i18next";

import config             from "./helpers/config";

import Loader             from './components/loader/Loader'

import PgGlobe            from './pages/pgGlobe/PgGlobe';
import PgCountries        from './pages/pgCountries/PgCountries';
import PgCountry          from './pages/pgCountry/PgCountry';
import PgAbout            from './pages/pgAbout/PgAbout';
import PgError404         from './pages/pgError404/PgError404';

// Async function to fetch Countries list and data from "RESTCountries" Api
async function fetchCountries(){
  const {data} = await axios.get(`https://restcountries.com/v3.1/all`);
  return data.sort( dataSorter );
}

// Create "SettingsContext" context, which will contain App settings
// to be shared accross all pages and components of this app
export const SettingsContext = createContext({});

// Create "DataContext" context, which will contain Countries' data
// to be shared accross all pages and components of this app
export const DataContext = createContext([]);

// Create "GlobeContext" context, which will contain Globe options
// to be persistent accross all pages navigation
export const mapContext = createContext({});

const App = () => {

  // Get Language direction
  //const[lang, setLngDir] = useState(getLangDir());
  
  // eslint-disable-next-line
  const {data, error, isError, isLoading } = useQuery('countries', fetchCountries);

  if (isLoading) {
    return <Loader />;
  }

  if(isError){
    return <div>Error! {error.message}</div>
  }

  console.log(data);

  return (
    (
      <div>
        <BrowserRouter>
          <SettingsContext.Provider value={config.settings}>
            <DataContext.Provider value={data}>
              <mapContext.Provider value={config.map}>
                <Routes>
                  <Route exact path="/"               element={<PgGlobe />}     />
                  <Route exact path="/countries"      element={<PgCountries />} />
                  <Route path="/country/:cca3"        element={<PgCountry />}   />
                  <Route exact path="/about"          element={<PgAbout />}     />
                  <Route path="*"                     element={<PgError404 />}  />
                </Routes>
              </mapContext.Provider>
            </DataContext.Provider>
          </SettingsContext.Provider>
        </BrowserRouter>
      </div>
    )
  );
};

export default App;
