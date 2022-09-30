import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from "react-i18next";

const Logo = () => {

  const { t } = useTranslation();

  return (
    <Navbar.Brand href="/" className="d-flex align-items-center">
      <img src="/assets/wmf-logo-white.svg" height="48" alt="WMF" />
      <div>
        <h4 className="ms-3 me-2 pt-0 lh-1 fw-bold text-uppercase text-white">{t("appName")}</h4>
        <h6 className="ms-3 me-2 pt-1 lh-1 fw-bold text-uppercase text-light">{t("appSubName")}</h6>
      </div>
    </Navbar.Brand>
  );
};

export default Logo;