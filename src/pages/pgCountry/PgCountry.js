import React from 'react';
import { useLocation } from 'react-router-dom';

import Header   from '../../components/header/Header';
import Country  from '../../components/country/Country';
import Footer   from '../../components/footer/Footer';

const PgCountry = () => {

  const location = useLocation();
  const country = location.state;

  return (
    <div className="pgCountry fullheight">
      <Header className="sticky-top" />
      <Country country={country}/>
      <Footer className="sticky-bottom" />
    </div>
  );
  
};

export default PgCountry;