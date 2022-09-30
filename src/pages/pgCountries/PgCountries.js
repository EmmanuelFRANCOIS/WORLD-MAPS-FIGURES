import React      from 'react';

import Header     from '../../components/header/Header';
import Countries  from '../../components/countries/Countries';
import Footer     from '../../components/footer/Footer';

const PgCountries = () => {
  return (
    <div className="bg-white">
      <Header className="sticky-top" />
      <Countries />
      <Footer />
    </div>
  );
};

export default PgCountries;