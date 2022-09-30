import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import config from "../../helpers/config.json";

import { useTranslation } from "react-i18next";

import * as d3          from 'd3';
import D3Helper         from "../../helpers/D3Helper";

import worldcountries   from "../../helpers/worldcountries.json";
import worldtemperature from "../../helpers/worldtemperature.json";

const { forwardRef, useImperativeHandle } = React;

const Globe = forwardRef( (props, ref) => {

  const navigate = useNavigate();

  // i18n Translations
  const { t } = useTranslation();

  // Update Page title
  document.title = t("TerrestrialGlobe") + " - " + t("appName");

  // Initialization of map dimensions
  const [dimensions, setDimensions] = useState( D3Helper.getDimensions(window.innerWidth, window.innerHeight - 176) );

  // Initialization of d3 map
  const svgRef = useRef(null);
  const svg = d3.select(svgRef.current);

  // Cleanup svg before redraw
  svg.selectAll("*").remove();

  // Setup Projection
  const projection = D3Helper.getProjection( props.mapOptions, dimensions, worldcountries );
  const path       = D3Helper.getPath( projection );
    
  // Required to prevent bad renders in projections which require clipping,
  // like interrupted and Armadillo projections
  // Must be the first child elements of svg
  // then add [.attr("clip-path", "url(#clip)")] to your layers
  let defs = svg.append("defs");
  defs.append("path").datum({type: "Sphere"}).attr("id", "sphere").attr("d", path);
  defs.append("clipPath").attr("id", "clip").append("use").attr("xlink:href", "#sphere");

  // Append background rectangle (Universe)
  svg.append("rect")
      .attr("class", "universe")
      .attr("id", "universe")
      .attr("x", 0)
      .attr("y", 0)
      // .attr("width", '100vw')
      // .attr("height", '100vh')
      .attr("clip-path", "url(#clip)")
      .attr("d", path);

  // Build Globe (oceans)
  svg.append("path")
      .datum({type: "Sphere"})
      .attr("class", "globe")
      .attr("id", "globe")
      .attr("clip-path", "url(#clip)")
      .attr("d", path);
              
  // Graticule
  const graticule = d3.geoGraticule();
  svg.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("id", "graticule")
      .attr("clip-path", "url(#clip)")
      .attr("d", path);

  // Cancer Tropic
  const cancerTropicCoord = { W: -180.0, N: 23.43, E: 180.0, S: 23.43 };
  const cancerTropic = d3.geoGraticule().extentMajor([[cancerTropicCoord.W, cancerTropicCoord.S], [cancerTropicCoord.E, cancerTropicCoord.N]]);
  svg.append("path").attr("class", "cancerTropic").attr("clip-path", "url(#clip)").attr("d", path(cancerTropic.outline()));

  // Equator
  const equatorCoord = { W: -180.0, N: 0, E: 180.0, S: 0 };
  svg.append("path")
    .datum({type: "LineString", coordinates: [
      [-180, equatorCoord.N], [-90, equatorCoord.N], 
      [0, 0], 
      [90, equatorCoord.S], [180, equatorCoord.S]
    ]})
    .attr("class", "equator")
    .attr("clip-path", "url(#clip)")
    .attr("d", path);

  // Capricorn Tropic
  const capricornTropicCoord = { W: -180.0, N: -23.43, E: 180.0, S: -23.43 };
  const capricornTropic = d3.geoGraticule().extentMajor([[capricornTropicCoord.W, capricornTropicCoord.S], [capricornTropicCoord.E, capricornTropicCoord.N]]);
  svg.append("path").attr("class", "capricornTropic").attr("clip-path", "url(#clip)").attr("d", path(capricornTropic.outline()));

  // Greenwich Meridian
  const greenwhichCoord = { W: -0.1, N: 90, E: 0.1, S: -90.0 };
  const greenwhich = d3.geoGraticule().extentMajor([[greenwhichCoord.W, greenwhichCoord.S], [greenwhichCoord.E, greenwhichCoord.N]]);
  svg.append("path").attr("class", "greenwhich").attr("clip-path", "url(#clip)").attr("d", path(greenwhich.outline()));

  // Display countries
  svg.selectAll(".country")
      .data(worldcountries.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("vector-effect", "non-scaling-stroke")
      .attr("class", "country")
      .attr("clip-path", "url(#clip)")
      .attr("id", d => d.id)
    // Action
    .on("mousemove", function(d,i) {
      d3.select(this).classed('countryHovered', true);
    })
    .on("mouseout",  function(d,i) {
      d3.select(this).classed('countryHovered', false);
    })
    .on("click",  function(d,i) {
      navigate("/country/" + i.id);
    });


  // Arctic Circle
  const arcticCoord = { W: -180.0, N: 90, E: 180.0, S: 66.33 };
  const arcticCircle = d3.geoGraticule().extentMajor([[arcticCoord.W, arcticCoord.S], [arcticCoord.E, arcticCoord.N]]);
  svg.append("path").attr("class", "arcticCircleArea").attr("clip-path", "url(#clip)").attr("d", path(arcticCircle.outline()));
                 
  // Antarctic Circle
  const antarcticCoord = { W: -180.0, N: -89.999, E: 180.0, S: -66.33 };
  const antarcticCircle = d3.geoGraticule().extentMajor([[antarcticCoord.W, antarcticCoord.S], [antarcticCoord.E, antarcticCoord.N]]);
  svg.append("path").attr("class", "antarcticCircleArea").attr("clip-path", "url(#clip)").attr("d", path(antarcticCircle.outline()));
                 
  // Legend and colors
  const quantile = d3.scaleQuantile().domain([
        d3.max(worldtemperature, e => +e.temperature),
        d3.min(worldtemperature, e => +e.temperature)
      ]).range(d3.range(60));

  const legend = svg
      .append('g')
      .attr('transform', 'translate(10, 10)')
      .attr('id', 'legend');
      
  legend.selectAll('.colorbar') // LIGNE 11
      .data(d3.range(60))
      .enter()
      .append('rect')
      .attr('y', d => 59 * 5 + (50 - d * 5) + 'px')
      .attr('height', '5px')
      .attr('width', '20px')
      .attr('x', '25px')
      .attr("class", d => "temperature-" + d);
  
  const legendScale = d3.scaleLinear()
      .domain([
        d3.min(worldtemperature, e => +e.temperature), 
        d3.max(worldtemperature, e => +e.temperature)
      ])
      .range([50 + 60 * 5, 50]);
      
  svg.append("g")
      .attr('transform', 'translate(25, 10)')
      .call(d3.axisLeft(legendScale).ticks(10));
  
  let clsTemp = "";
  worldtemperature.forEach( function(e, i) {
    clsTemp = "country temperature-" + quantile(+e.temperature);
    d3.select("#" + e.country) // LIGNE 29
        .attr("class", clsTemp);
  });

  // Rotate Management
  const resetRotate = () => {
    console.log('resetRotate');
  }
  // Rotation management
  const λ = d3.scaleLinear()
              .domain([0, dimensions.width])
              .range([-180, 180]);
  const φ = d3.scaleLinear()
              .domain([0, dimensions.height])
              .range([90, -90]);
  const dragging = d3.drag().subject(function() {
      const r = projection.rotate();
      return {
        x: props.mapOptions.rotationX ? λ.invert(r[0]) : λ.invert(0),
        y: props.mapOptions.rotationY ? φ.invert(r[1]) : φ.invert(0)
      };
    }).on("drag", function(event) {
      projection.rotate([λ(event.x), φ(event.y)]);
      svg.selectAll( ".graticule"       ).attr( "d", path );
      svg.selectAll( ".country"         ).attr( "d", path );
      svg.selectAll( ".arcticCircleArea"    ).attr( "d", path );
      svg.selectAll( ".antarcticCircleArea"    ).attr( "d", path );
      svg.selectAll( ".cancerTropic"    ).attr( "d", path );
      svg.selectAll( ".equator"         ).attr( "d", path );
      svg.selectAll( ".capricornTropic" ).attr( "d", path );
      svg.selectAll( ".antarcticCircle" ).attr( "d", path );
      svg.selectAll( ".greenwhich"      ).attr( "d", path );
    });

  // Zoom Management
  const resetZoom = () => {
    console.log('resetZoom');
    svg.transition().call(zooming.scaleTo, 1);
  }
  const zooming = d3.zoom()
    .translateExtent([
      [ dimensions.width / 2, dimensions.height / 2 ], 
      [ dimensions.width / 2, dimensions.height / 2 ]
    ])
    .scaleExtent([config.map.zoomLevelMin, config.map.zoomLevelMax])
    .on("zoom", (event) => {
      svg.selectAll( ".globe"           ).attr( "transform", event.transform );
      svg.selectAll( ".country"         ).attr( "transform", event.transform ).attr( "stroke-width", "1" );
      svg.selectAll( ".graticule"       ).attr( "transform", event.transform );
      svg.selectAll( ".arcticCircleArea"    ).attr( "transform", event.transform );
      svg.selectAll( ".antarcticCircleArea"    ).attr( "transform", event.transform );
      svg.selectAll( ".cancerTropic"    ).attr( "transform", event.transform );
      svg.selectAll( ".equator"         ).attr( "transform", event.transform );
      svg.selectAll( ".capricornTropic" ).attr( "transform", event.transform );
      svg.selectAll( ".greenwhich"      ).attr( "transform", event.transform );
    });

  useImperativeHandle(ref, () => ({
    resetRotate, resetZoom
  }));

  //Auto resizer
  function handleResize () {
    setDimensions( { "width": window.innerWidth, "height": window.innerHeight - 176 } );
  }
  
  useEffect(() => {
    //Auto resizer
    window.addEventListener( 'resize', handleResize );
  }, []);

  useEffect(() => {
    // Handle Rotation (dragging)
    svg.call(dragging);
    // Handle Zooming
    svg.call(zooming);
  }, [svg, zooming, dragging]);

  return (
    <div className="container-fluid p-0 m-0 text-center">
      <svg className="mapContainer" ref={svgRef}
           width={dimensions.width} height={dimensions.height} />
    </div>
  );

});

export default Globe;