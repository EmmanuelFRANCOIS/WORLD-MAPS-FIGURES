import React, { useEffect } from "react";
import Header from "../../components/header/Header";

import { useTranslation } from "react-i18next";

const PgAbout = () => {

  const { t } = useTranslation();

  useEffect(() => {

    // Update Page title
    document.title = t("About") + " - " + t("appName");

  }, [t])
  
  return (
    <>
      <Header />
      <div className="d-flex justify-content-between align-items-center px-3 py-1 bg-secondary text-white shadow-lg countriesBar">
        <h1 className="pe-2 py-2 m-0 lh-1 fs-2 fw-bold text-uppercase"><small>{t("About")}</small></h1>
      </div>
      <div className="p-3 bg-white">

        <div className="d-flex justify-content-between">
          <div>
            <h2 className="mt-2 fw-bold text-uppercase text-primary">World Countries Maps & Figures (WCMF)</h2>
            <h5 className="text-danger"><strong>Caution</strong>: This project is a <strong>self-training project !</strong>.</h5>
            <p>As a matter of fact, I do not provide any guarantee in terms of provided data, nor any kind of results you as a user could expect from it.</p>
            <p>It is based on a [video tutorial from FromScratch (French language)](https://www.youtube.com/watch?v=f0X1Tl8aHtA).</p>
            <p>This short (2h) 2022 tutorial is a good starting point for discovering <strong>REACT</strong>.</p>
            <p>However, once I finished this tutorial, I decided to go far beyond, to discover many more **advanced REACT features**.</p>
            <p>This is how the <strong>"World Countries Maps & Figures" (WCMF)</strong> application took shape in July, 2022, somewhere on our wonderful planet...</p>
          </div>
          <div className="px-3 py-1 border border-primary">
            <h2 className="mt-2 fw-bold text-uppercase text-primary">Who am I ?</h2>
            
          </div>
        </div>

        <h2 className="mt-5 fw-bold text-uppercase text-primary">The WCMF Project</h2>
        <p>The project consists in building an <strong>interactive interface to browse World and Countries' figures & data</strong>.</p>
        <p>The vast majority of Countries' data come from <strong>RESTCountries.org pubic API</strong>, others are mainly from <strong>WIKIPEDIA</strong> website.</p>
        <p>The purpose of this application is not to provide absolutely perfect data about Countries, but to be a <strong>showcase</strong> of what I'm able <strong>to deliver as a developer</strong>.</p>
        <p>And this includes :</p>
        <ul>
          <li><strong>quality, performance, efficiency, usability, robustness</strong> of concepts and codes...</li>
          <li><strong>large, complex datasets</strong> assembly from multiple sources, compilation and management</li>
        </ul>
        <p>I hope you will have a good experience as trying my <strong>WCMF application</strong>!</p>
        <p>Please, don't hesitate to send me any feedback about it: <strong>feedback is fuel of improvement!</strong>...</p>

        <h2 className="mt-5 fw-bold text-uppercase text-primary">IMPLEMENTED REACT CONCEPTS, BEST PRACTICES & FEATURES</h2>
        <ul className="features">
          <li>React-Router-Dom : App routing + Error 404 page</li>
          <li>Hooks : useEffect, useState, useRef, useLocation</li>
          <li>Global states with REACT Context</li>
          <li>Pass parameters from Parent to Child Components</li>
          <li>Pass parameters from Child to Parent Components</li>
          <li>Pass parameters from one Page to another Page (useLocation)</li>
          <li>Parametering CSS styles in Components' render JSX code</li>
          <li>Axios get call inside a Context provider</li>
          <li>Implementation of complex JS libraries (D3.js) in React</li>
          <li>Multilingual app + Language selector</li>
        </ul>

        <h2 className="mt-5 fw-bold text-uppercase text-primary">Main Technologies Implemented</h2>
        <div className="d-flex py-3 border-top border-bottom border-light">
          <div className="px-3 text-center">
            <img src="./assets/logos/React.svg" alt="ReactJS" height="48" />
            <div className="mt-2">ReactJS 18.2</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/React-Bootstrap.svg" alt="React-Bootstrap" height="48" />
            <div className="mt-2">React-Bootstrap 2.4</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/React-Query.svg" alt="React-Query" height="48" />
            <div className="mt-2">React-Query 3.39</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/React-Table.svg" alt="React-Table" height="48" />
            <div className="mt-2">React-Table 8.2</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/React-i18next.svg" alt="React-i18next" height="48" />
            <div className="mt-2">React-i18next 11.1</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/React-Helmet.svg" alt="React-Helmet" height="48" />
            <div className="mt-2">React-Helmet 6.1</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/React-Color.svg" alt="React-Color" height="48" />
            <div className="mt-2">React-Color 2.19.3</div>
          </div>
        </div>
        <div className="d-flex py-3 border-bottom border-light">
          <div className="px-3 text-center">
            <img src="./assets/logos/Axios.svg" alt="Axios" height="48" />
            <div className="mt-2">Axios 0.27</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/i18next.svg" alt="i18next" height="48" />
            <div className="mt-2">i18next 21.8</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/D3js.svg" alt="D3.js" height="48" />
            <div className="mt-2">D3.js 7.6</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/GoogleMaps.svg" alt="Google Maps" height="48" />
            <div className="mt-2">Google Maps</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/OpenStreetMap.svg" alt="OpenStreetMap" height="48" />
            <div className="mt-2">OpenStreetMap</div>
          </div>
        </div>
        <div className="d-flex py-3 border-bottom border-light">
          <div className="px-3 text-center">
            <img src="./assets/logos/HTML5.svg" alt="HTML 5" height="48" />
            <div className="mt-2">HTML 5</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/CSS3.svg" alt="CSS 3" height="48" />
            <div className="mt-2">CSS 3</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/Javascript.svg" alt="Javascript" height="48" />
            <div className="mt-2">Javascript ES6</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/Bootstrap.svg" alt="Bootstrap" height="48" />
            <div className="mt-2">Bootstrap 5.1.3</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/FontAwesome.svg" alt="FontAwesome" height="48" />
            <div className="mt-2">FontAwesome 6.1</div>
          </div>
          <div className="px-3 text-center">
            <img src="./assets/logos/Sass.svg" alt="Sass" height="48" />
            <div className="mt-2">Sass 1.53</div>
          </div>
        </div>
        <div className="d-flex py-3 border-bottom border-light">
          <div className="px-3 me-5 d-flex align-items-end">
            <div className="px-4 text-center">
              <img src="./assets/logos/NodeJS.svg" alt="NodeJS" height="48" />
              <div className="mt-2">NodeJS 18.1</div>
              <div>Developpement server</div>
            </div>
          </div>
          <div className="px-3 me-5 d-flex align-items-end">
            <div className="px-4 text-center">
              <img src="./assets/logos/NPM.svg" alt="NodeJS" height="32" style={{ margin: "8px 0"}} />
              <div className="mt-2">NPM 8.15</div>
              <div>Packages manager</div>
            </div>
          </div>
        </div>

        <h2 className="mt-5 fw-bold text-uppercase text-primary">Github Repository</h2>
        <div><a target="_blank" href="https://github.com/EmmanuelFRANCOIS/WORLD-MAPS-FIGURES">https://github.com/EmmanuelFRANCOIS/WORLD-MAPS-FIGURES</a></div>

        <h2 className="mt-5 fw-bold text-uppercase text-primary">Live Demo</h2>

      </div>
    </>
  );
};

export default PgAbout;
