import React from 'react';

import Logo from "../logo/Logo";

const Loader = () => {
  return (
    <div className="mt-5 mx-auto p-5 w-50 text-center bg-dark rounded text-light">
      <div className="d-block w-auto px-3 text-center"><Logo /></div>
      <img src="/assets/loader.svg" height="100" className="my-5" alt="" />
      <h5>loading</h5>
      <h2 className="my-5"><strong>COUNTRIES' DATA</strong>...</h2>
    </div>
  );
};

export default Loader;