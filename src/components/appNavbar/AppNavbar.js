import React from "react";
import { Link, useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useTranslation } from "react-i18next";
import i18next_data from "../../helpers/i18next_data";

import Logo from "../logo/Logo";

function AppNavbar() {

  const appPath = useLocation();

  const languages = i18next_data.languages;
  const { t, i18n } = useTranslation();

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="primary" variant="dark" className="py-1 pageHeader">
        <Container fluid className="px-4">
          <Logo />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav activeKey={appPath.pathname} defaultActiveKey="/" 
                className="btn-group flex-row ms-auto text-uppercase">
              <Nav.Link as={Link} to="/" eventKey="/" data="data"
                        className="btn btn-secondary border-2 fs-5 fw-bold px-3">
                {t("Map")}
              </Nav.Link>
              <Nav.Link as={Link} to="/countries" eventKey="/countries" data="data"
                        className="btn btn-secondary border-2 fs-5 fw-bold px-3">
                {t("Countries")}
              </Nav.Link>
            </Nav>
            <Link as={Link} to="/about"
                      className="btn btn-secondary border-2 fs-5 fw-bold ms-3 py-2 px-3 text-uppercase">
              {t("About")}
            </Link>
            <NavDropdown title={<span style={{ fontSize: '40px', color: 'white' }}>{languages[i18n.resolvedLanguage].flag}</span>} 
                            id="basic-nav-dropdown" align="end" menuVariant="dark"
                            className="btn fw-bold py-0 px-0 lh-1 ms-3 align-items-center">
              {Object.keys(languages).map( (lng) => (
                <NavDropdown.Item key={lng} className="py-2"
                          style={ i18n.resolvedLanguage === lng ? {'font-weight' : 'bold', 'text-transform': 'uppercase', 'color': 'white' } : {} }
                          type="submit" onClick={() => { i18n.changeLanguage(lng); document.documentElement.lang = i18n.language; }}>
                  {languages[lng].flag + " " + languages[lng].nativeName}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
