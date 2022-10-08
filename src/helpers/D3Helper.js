import config   from "./config.json";
import * as d3  from "d3";
import * as d3Proj from "d3-geo-projection";
//import {d3, map} from "@d3/world-map";
//import {d3, map} with {projection} from "@d3/world-map";

export default class D3Helper {

  // Get view dimensions
  static getDimensions( viewWidth, viewHeight ) {
    return {
      "width" :  viewWidth,
      "height" : viewHeight
    };
  }

  // Get Map projection
  static getProjection ( mapOptions, dimensions, geoJsonObject ) {

    let projection  = null,
        mapWidth    = dimensions.width  - config.map.marginLeft - config.map.marginRight,
        mapHeight   = dimensions.height - config.map.marginTop  - config.map.marginBottom;

    switch ( mapOptions.projection ) {

      // D3 Common Projections
      case 'albers': projection = d3.geoAlbers(); break;
      case 'azimuthalEqualArea': projection = d3.geoAzimuthalEqualArea(); break;
      case 'azimuthalEquidistant': projection = d3.geoAzimuthalEquidistant(); break;
      case 'conicConformal': projection = d3.geoConicConformal(); break;
      case 'conicEqualArea': projection = d3.geoConicEqualArea(); break;
      case 'conicEquidistant': projection = d3.geoConicEquidistant(); break;
      case 'equalEarth': projection = d3.geoEqualEarth(); break;
      case 'equirectangular': projection = d3.geoEquirectangular(); break;
      case 'gnomonic': projection = d3.geoGnomonic(); break;
      case 'mercator': projection = d3.geoMercator(); break;
      case 'naturalEarth1': projection = d3.geoNaturalEarth1(); break;
      case 'orthographic': projection = d3.geoOrthographic(); break;
      case 'stereographic': projection = d3.geoStereographic(); break;
      case 'transverseMercator': projection = d3.geoTransverseMercator(); break;
      
      // D3-geo-projection Extended projections plugin
      case 'airy': projection = d3Proj.geoAiry(); break;
      case 'aitoff': projection = d3Proj.geoAitoff(); break;
      case 'armadillo': projection = d3Proj.geoArmadillo(); break;
      case 'august': projection = d3Proj.geoAugust(); break;
      case 'baker': projection = d3Proj.geoBaker(); break;
      case 'berghaus': projection = d3Proj.geoBerghaus(); break;
      case 'bertin1953': projection = d3Proj.geoBertin1953(); break;
      case 'boggs': projection = d3Proj.geoBoggs(); break;
      case 'bonne': projection = d3Proj.geoBonne(); break;
      case 'bottomley': projection = d3Proj.geoBottomley(); break;
      case 'bromley': projection = d3Proj.geoBromley(); break;
      case 'chamberlin': projection = d3Proj.geoChamberlin(); break;
      case 'collignon': projection = d3Proj.geoCollignon(); break;
      case 'craig': projection = d3Proj.geoCraig(); break;
      case 'craster': projection = d3Proj.geoCraster(); break;
      case 'cylindricalEqualArea': projection = d3Proj.geoCylindricalEqualArea(); break;
      case 'cylindricalStereographic': projection = d3Proj.geoCylindricalStereographic(); break;
      case 'eckert1': projection = d3Proj.geoEckert1(); break;
      case 'eckert2': projection = d3Proj.geoEckert2(); break;
      case 'eckert3': projection = d3Proj.geoEckert3(); break;
      case 'eckert4': projection = d3Proj.geoEckert4(); break;
      case 'eckert5': projection = d3Proj.geoEckert5(); break;
      case 'eckert6': projection = d3Proj.geoEckert6(); break;
      case 'eisenlohr': projection = d3Proj.geoEisenlohr(); break;
      case 'fahey': projection = d3Proj.geoFahey(); break;
      case 'foucaut': projection = d3Proj.geoFoucaut(); break;
      case 'foucautSinusoidal': projection = d3Proj.geoFoucautSinusoidal(); break;
      case 'gilbert': projection = d3Proj.geoGilbert(); break;
      case 'gingery': projection = d3Proj.geoGingery(); break;
      case 'ginzburg4': projection = d3Proj.geoGinzburg4(); break;
      case 'ginzburg5': projection = d3Proj.geoGinzburg5(); break;
      case 'ginzburg6': projection = d3Proj.geoGinzburg6(); break;
      case 'ginzburg8': projection = d3Proj.geoGinzburg8(); break;
      case 'ginzburg9': projection = d3Proj.geoGinzburg9(); break;
      case 'gringorten': projection = d3Proj.geoGringorten(); break;
      case 'guyou': projection = d3Proj.geoGuyou(); break;
      case 'hammer': projection = d3Proj.geoHammer(); break;
      case 'hammerRetroazimuthal': projection = d3Proj.geoHammerRetroazimuthal(); break;
      case 'healpix': projection = d3Proj.geoHealpix(); break;
      case 'hill': projection = d3Proj.geoHill(); break;
      case 'homolosine': projection = d3Proj.geoHomolosine(); break;
      case 'hufnagel': projection = d3Proj.geoHufnagel(); break;
      case 'hyperelliptical': projection = d3Proj.geoHyperelliptical(); break;
      case 'kavrayskiy7': projection = d3Proj.geoKavrayskiy7(); break;
      case 'lagrange': projection = d3Proj.geoLagrange(); break;
      case 'larrivee': projection = d3Proj.geoLarrivee(); break;
      case 'laskowski': projection = d3Proj.geoLaskowski(); break;
      case 'littrow': projection = d3Proj.geoLittrow(); break;
      case 'loximuthal': projection = d3Proj.geoLoximuthal(); break;
      case 'miller': projection = d3Proj.geoMiller(); break;
      case 'modifiedStereographic': projection = d3Proj.geoModifiedStereographic(); break;
      case 'modifiedStereographicAlaska': projection = d3Proj.geoModifiedStereographicAlaska(); break;
      case 'modifiedStereographicGs48': projection = d3Proj.geoModifiedStereographicGs48(); break;
      case 'modifiedStereographicGs50': projection = d3Proj.geoModifiedStereographicGs50(); break;
      case 'modifiedStereographicLee': projection = d3Proj.geoModifiedStereographicLee(); break;
      case 'modifiedStereographicMiller': projection = d3Proj.geoModifiedStereographicMiller(); break;
      case 'mollweide': projection = d3Proj.geoMollweide(); break;
      case 'mtFlatPolarParabolic': projection = d3Proj.geoMtFlatPolarParabolic(); break;
      case 'mtFlatPolarQuartic': projection = d3Proj.geoMtFlatPolarQuartic(); break;
      case 'mtFlatPolarSinusoidal': projection = d3Proj.geoMtFlatPolarSinusoidal(); break;
      case 'naturalEarth2': projection = d3Proj.geoNaturalEarth2(); break;
      case 'nellHammer': projection = d3Proj.geoNellHammer(); break;
      case 'nicolosi': projection = d3Proj.geoNicolosi(); break;
      case 'patterson': projection = d3Proj.geoPatterson(); break;
      case 'polyconic': projection = d3Proj.geoPolyconic(); break;
      case 'rectangularPolyconic': projection = d3Proj.geoRectangularPolyconic(); break;
      case 'robinson': projection = d3Proj.geoRobinson(); break;
      case 'satellite': projection = d3Proj.geoSatellite(); break;
      case 'sinuMollweide': projection = d3Proj.geoSinuMollweide(); break;
      case 'sinusoidal': projection = d3Proj.geoSinusoidal(); break;
      case 'times': projection = d3Proj.geoTimes(); break;
      case 'twoPointAzimuthal': projection = d3Proj.geoTwoPointAzimuthal(); break;
      case 'twoPointAzimuthalUsa': projection = d3Proj.geoTwoPointAzimuthalUsa(); break;
      case 'twoPointEquidistant': projection = d3Proj.geoTwoPointEquidistant(); break;
      case 'twoPointEquidistantUsa': projection = d3Proj.geoTwoPointEquidistantUsa(); break;
      case 'vanDerGrinten': projection = d3Proj.geoVanDerGrinten(); break;
      case 'vanDerGrinten2': projection = d3Proj.geoVanDerGrinten2(); break;
      case 'vanDerGrinten3': projection = d3Proj.geoVanDerGrinten3(); break;
      case 'vanDerGrinten4': projection = d3Proj.geoVanDerGrinten4(); break;
      case 'wagner': projection = d3Proj.geoWagner(); break;
      case 'wagner4': projection = d3Proj.geoWagner4(); break;
      case 'wagner6': projection = d3Proj.geoWagner6(); break;
      case 'wagner7': projection = d3Proj.geoWagner7(); break;
      case 'wiechel': projection = d3Proj.geoWiechel(); break;
      case 'winkel3': projection = d3Proj.geoWinkel3(); break;
      case 'polyhedralButterfly': projection = d3Proj.geoPolyhedralButterfly(); break;
      case 'polyhedralCollignon': projection = d3Proj.geoPolyhedralCollignon(); break;
      case 'polyhedralWaterman': projection = d3Proj.geoPolyhedralWaterman(); break;
      case 'gringortenQuincuncial': projection = d3Proj.geoGringortenQuincuncial(); break;
      case 'peirceQuincuncial': projection = d3Proj.geoPeirceQuincuncial(); break;      
      
      // Default projection
      default: projection = d3.geoOrthographic(); break;

    }

    projection.fitExtent( 
      [ 
        [config.map.marginLeft, config.map.marginTop], 
        [config.map.marginLeft + mapWidth, config.map.marginTop + mapHeight]
      ],
      ( mapOptions.zoomMode === 'global' ? { type: 'Sphere' } : geoJsonObject )
    );   // 'Sphere' or geoJsonObject

    return projection;

  }

  static getPath( projection ) {
    return d3.geoPath()
             .projection( projection );
  }

}


