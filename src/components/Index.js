import React, { useEffect, useState,useRef } from "react";
import logo from "../images/logo.png";
import umbrella from "../images/icon-umberella.png";
import tt from "../images/tt.jpg";
// import icon1 from "../images/icons/icon-1.svg";
import compass from "../images/icon-compass.png";
import "./style.css";
import wind from "../images/icon-wind.png";
import icon4 from "../images/icons/icon-1.svg";
import icon2 from "../images/icons/icon-2.svg";
import icon3 from "../images/icons/icon-3.svg";
import icon1 from "../images/icons/icon-4.svg";
import icon5 from "../images/icons/icon-5.svg";
import icon6 from "../images/icons/icon-6.svg";
import icon8 from "../images/icons/icon-8.svg";
import icon9 from "../images/icons/icon-9.svg";
import icon10 from "../images/icons/icon-10.svg";
import icon11 from "../images/icons/icon-11.svg";
import fire from "../images/fire.png";
import drought from "../images/drought.jpg";
import mozambique from "../images/mozambique.jpg";

import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import Point from "ol/geom/Point.js";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
import { DragPan, defaults as defaultInteractions } from "ol/interaction";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom.js";
import { shiftKeyOnly } from "ol/events/condition.js";
import Geolocation from "ol/Geolocation.js";
import Feature from "ol/Feature.js";
import { Vector as VectorSource } from "ol/source.js";
import { Vector as VectorLayer } from "ol/layer.js";
import LayerSwitcher from "ol-layerswitcher";
import "ol/ol.css";
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';

export default function Index() {
  

  let names = [
    "Ayla",
    "Jake",
    "Sean",
    "Henry",
    "Brad",
    "Stephen",
    "Taylor",
    "Timmy",
    "Cathy",
    "John",
    "Amanda",
    "Amara",
    "Sam",
    "Sandy",
    "Danny",
    "Ellen",
    "Camille",
    "Chloe",
    "Emily",
    "Nadia",
    "Mitchell",
    "Harvey",
    "Lucy",
    "Amy",
    "Glen",
    "Peter",
  ];
  //Sort names in ascending order
  let sortedNames = names.sort();
  const elementRef = useRef();
 


const cityCoordinates =[
  {name:'Tokyo',coordinate:[35.6839,139.7744]},
  {name:'New York',coordinate:[40.6943,-73.9249]},
  {name:'NewMexico City',coordinate:[19.4333,-99.1333]},
  {name:'Mumbai',coordinate:[18.9667,72.8333]},
  {name:'Sao Paulo',coordinate:[-23.5504,-46.6339]},

]




  const weatherTypes = [
    {name:'light rain',path:icon1},
        {name:'moderate rain',path:icon2},
        {name:'heavy intensity rain',path:icon3},
        {name:'very heavy rain',path:icon4},
        {name:'extreme rain',path:icon5},
        {name:'freezing rain',path:icon6},
        {name:'light intensity shower rain',path:icon8},
        {name:'shower rain',path:icon9},
        {name:'heavy intensity shower rain',path:icon10},
        {name:'ragged shower rain',path:icon11},
        {name:'broken clouds',path:icon11},
        {name:'scattered clouds',path:icon11},
        {name:'overcast clouds',path:icon11},
        {name:'few clouds',path:icon11},
        {name:'mist',path:icon11},
        {name:'haze',path:icon11},


] 
  const [map, setMap] = useState(false);
  const [coordinate, setCoordinate] = useState(false);
  const [weatherdata, setWeatherData] = useState(false);
  const [weathercity, setWeathrCity] = useState(false);
  const [currentcity, setCurrentCity] = useState('Addis Ababa');
  const [currenttemp, setCurrentTemp] = useState(false);
  const geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: "EPSG:4326"
  });
  const geoLocate = e => {
    elementRef.current.value=''
    geolocation.setTracking(true);
    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({
            color: "red"
          }),
          stroke: new Stroke({
            color: "red",
            width: 2
          })
        })
      })
    );
    geolocation.on("change:position", function() {
      const coordinates = geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
      const location3 =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        coordinates[1] +
        "&lon=" +
        coordinates[0] +
        "&appid=dc00e629629492b92d71c7827be394b9";
      fetch(location3).then(response => response.json()).then(data => {
        setCurrentTemp(data);
        setCurrentCity(data.name);
      });

      const location4 =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        coordinates[1] +
        "&lon=" +
        coordinates[0] +
        "&appid=dc00e629629492b92d71c7827be394b9";
      fetch(location4).then(response => response.json()).then(data => {
        // console.log(data)
        setWeatherData(
          data["list"].filter(x => x.dt_txt.split(" ")[1] === "18:00:00")
        );
        setWeathrCity(data["city"].name);
      });
    });
    const layer = new VectorLayer({
      source: new VectorSource({
        features: [positionFeature]
      }),
      title: 'feature',
    });
    map.addLayer(layer);
    console.log(layer)
  };
 
  useEffect(() => {
  

    elementRef.current.addEventListener("keyup", (e) => {
      //loop through above array
      //Initially remove all elements ( so if user erases a letter or adds new letter then clean previous outputs)
      removeElements();
      // console.log(cityCoordinates.map(x=>x.name))
      for (let i of cityCoordinates.map(x=>x.name)) {
        // console.log()
        //convert input to lowercase and compare with each string
        if (
          i.toLowerCase().startsWith(elementRef.current.value.toLowerCase()) &&
          elementRef.current.value != ""
        ) {
          //create li element
          let listItem = document.createElement("li");
          //One common class name
          listItem.classList.add("list-items");
          listItem.style.cursor = "pointer";
          // listItem.setAttribute("onClick", () => displayNames(i));
          listItem.onclick = function() { displayNames(i,cityCoordinates.filter(x=>x.name===i)[0].coordinate) };

          // listItem.setAttribute("click=", ()=>displayNames(i));
          //Display matched part in bold
          let word = "<b>" + i.substr(0, elementRef.current.value.length) + "</b>";
          word += i.substr(elementRef.current.value.length);
          //display the value in array
          listItem.innerHTML = word;
          document.querySelector(".list").appendChild(listItem);
        }
      }
    });
   
    function displayNames(value,all) {
      console.log(value)
      console.log(all[0])
      console.log(all[1])
      const location3 =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        all[0] +
        "&lon=" +
        all[1] +
        "&appid=dc00e629629492b92d71c7827be394b9";
      fetch(location3).then(response => response.json()).then(data => {
        setCurrentTemp(data);
        setCurrentCity(data.name);
      });

      const location4 =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        all[0] +
        "&lon=" +
        all[1] +
        "&appid=dc00e629629492b92d71c7827be394b9";
      fetch(location4).then(response => response.json()).then(data => {
        // console.log(data)
        setWeatherData(
          data["list"].filter(x => x.dt_txt.split(" ")[1] === "18:00:00")
        );
        setWeathrCity(data["city"].name);
      });
      elementRef.current.value = value;
      removeElements();
      // cityCoordinates
    }
    const  removeElements=()=> {
      //clear all the item
      let items = document.querySelectorAll(".list-items");
      items.forEach((item) => {
        item.remove();
      });
    }


    const script = document.createElement("script");

    script.src = "https://app1.weatherwidget.org/js/?id=ww_6ee81aeb9dcc3";
    script.async = true;
    document.body.appendChild(script);


    const osm = new LayerTile({
      title: 'OSM',
      type: 'base',
      visible: true,
      source: new SourceOSM()
    } );
    
    const watercolor = new LayerTile({
      title: 'Water color',
      type: 'base',
      visible: false,
      source: new SourceStamen({
        layer: 'watercolor'
      })
    } );
    
    const baseMaps = new LayerGroup({
      title: 'Base maps',
      layers: [osm, watercolor]
    } );
    





    const map = new Map({
      interactions: defaultInteractions({ mouseWheelZoom: false }),
      layers: [baseMaps
      ],
      target: "map",
      view: new View({
        center: [38, 9],
        zoom: 6,
        smoothResolutionConstraint: false,
        projection: "EPSG:4326"
      })
    });
    const layerSwitcher = new LayerSwitcher({
      reverse: true,
      groupSelectStyle: "group"
    });
    map.addControl(layerSwitcher);
    setMap(map);
    var mouseWheelInt = new MouseWheelZoom();
    map.addInteraction(mouseWheelInt);
    map.on("wheel", function(evt) {
      mouseWheelInt.setActive(shiftKeyOnly(evt));
    });
    const location =
      "https://api.openweathermap.org/data/2.5/forecast?q=adiss&appid=dc00e629629492b92d71c7827be394b9";
    fetch(location).then(response => response.json()).then(data => {
      setWeatherData(
        data["list"].filter(x => x.dt_txt.split(" ")[1] === "18:00:00")
      );
      setWeathrCity(data["city"].name);
    });
    const location2 =
      "https://api.openweathermap.org/data/2.5/weather?q=Addis Ababa&appid=dc00e629629492b92d71c7827be394b9";
    fetch(location2).then(response => response.json()).then(data => {
      setCurrentCity(data.name);
      setCurrentTemp(data);
    });
  }, []);
  const getDayname = name => {
    if (weatherdata) {
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      var date = new Date(name);
      var dayName = days[date.getDay()];
      // console
      return dayName;
    } else {
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      var dayName = days[name];
      // console
      return dayName;
    }
  };
  const getDayMonth = val => {
    return [
      val.toDateString().split(" ")[2] + "  " + val.toDateString().split(" ")[1]
    ];
  };
  const getIcon = (val)=>{

    console.log(val)
    if(val!=='no'){
      if(weatherTypes.filter(x=>x.name===val)[0].path!==undefined){
      return weatherTypes.filter(x=>x.name===val)[0].path
    }
    else{
      console.log(false)
    }
    }
    else{
      return './'
    }
  }
  return ((
    <div className="site-content">
      <div className="site-header">
        <div className="container">
          <a href="index.html" className="branding">
            <img src={logo} alt="" className="logo" />
            <div className="logo-type">
              <h1 className="site-title">Forecast Ahead</h1>
              <small className="site-description"> Cool Breeze!</small>
            </div>
          </a>

          <div className="main-navigation">
            <button type="button" className="menu-toggle">
              <i className="fa fa-bars" />
            </button>
          </div>

          <div className="mobile-navigation" />
        </div>
      </div>

      <div
        className="hero"
        style={{ backgroundImage: `url(${tt})` }}
        // data-bg-image={tt}
      >
        <div className="container">
        <form autoComplete="off"className="find-location">
      <div>
        <input onClick={e => geoLocate(e)} type="button" />
        <input ref={elementRef}  type="text" id="input" placeholder="Find your city location..." />
      </div>
      <ul class="list"></ul>
    </form>
          {/* <form action="#" className="find-location">
            <input onClick={e => geoLocate(e)} type="button" />
            <input type="text" placeholder="Find your location..." />
            <input className="btn" type="submit" value="Find" />
          </form> */}
        </div>
      </div>
      <div className="forecast-table">
        <div className="container">
          <div className="forecast-container">
            <div className="today forecast">
              <div className="forecast-header">
                <div className="day">Today</div>
                <div className="date">
                  {getDayMonth(new Date())}
                </div>
              </div>
              <div className="forecast-content">
                <div className="location">
                  {currentcity}
                </div>
                <div className="degree">
                  <div className="num">
                    {currenttemp ? (currenttemp["main"].temp-273.15).toFixed(1) : ""}
                    <sup>o</sup>C
                  </div>
                  <div className="forecast-icon">
                    <img src={currenttemp ? getIcon(currenttemp['weather'][0].description):getIcon('no')} alt="" width="90" />
                  </div>
                </div>
                <span>
                  <img src={umbrella} alt="" />
                  {/* {currenttemp
                    ? Object.keys(currenttemp.rain) +
                      "  " +
                      Object.values(currenttemp.rain)
                    : ""} */}
                </span>
                <span>
                  <img src={wind} alt="" />
                  {currenttemp ? currenttemp.wind.speed : ""}km/h
                </span>
                <span>
                  <img src={compass} alt="" />
                  {currenttemp ? currenttemp.wind.deg + " degree" : ""}
                </span>
              </div>
            </div>
            <div className="forecast">
              <div className="forecast-header">
                <div className="day">
                  {weatherdata ? getDayname(weatherdata[0].dt_txt) : ""}
                </div>
              </div>
              <div className="forecast-content">
                <div className="forecast-icon">
                  <img src={currenttemp ? getIcon(currenttemp['weather'][0].description):getIcon('no')} alt="" width="48" />
                </div>
                <div className="degree">
                  {weatherdata ? (weatherdata[0].main.temp-273.15).toFixed(2) : ""}
                  <sup>o</sup>C
                </div>
                <small>
                {weatherdata ? (weatherdata[0].main.temp_min-273.15).toFixed(2) : ""}<sup>o</sup>C
                </small>
              </div>
            </div>
            <div className="forecast">
              <div className="forecast-header">
                <div className="day">
                  {weatherdata ? getDayname(weatherdata[1].dt_txt) : ""}
                </div>
              </div>{" "}
              <div className="forecast-content">
                <div className="forecast-icon">
                  <img src={currenttemp ? getIcon(currenttemp['weather'][0].description):getIcon('no')}alt="" width="48" />
                </div>
                <div className="degree">
                  {weatherdata ? (weatherdata[1].main.temp-273.15).toFixed(2) : ""}
                  <sup>o</sup>C
                </div>
                <small>
                {weatherdata ? (weatherdata[1].main.temp_min-273.15).toFixed(2) : ""}<sup>o</sup>C
<sup>o</sup>
                </small>
              </div>
            </div>
            <div className="forecast">
              <div className="forecast-header">
                <div className="day">
                  {weatherdata ? getDayname(weatherdata[2].dt_txt) : ""}
                </div>
              </div>{" "}
              <div className="forecast-content">
                <div className="forecast-icon">
                  <img src={currenttemp ? getIcon(currenttemp['weather'][0].description):getIcon('no')} alt="" width="48" />
                </div>
                <div className="degree">
                  {weatherdata ? (weatherdata[2].main.temp-273.15).toFixed(2) : ""}
                  <sup>o</sup>C
                </div>
                <small>
                {weatherdata ? (weatherdata[2].main.temp_min -273.15).toFixed(2): ""}<sup>o</sup>C

                </small>
              </div>
            </div>
            <div className="forecast">
              <div className="forecast-header">
                <div className="day">
                  {weatherdata ? getDayname(weatherdata[3].dt_txt) : ""}
                </div>
              </div>{" "}
              <div className="forecast-content">
                <div className="forecast-icon">
                  <img src={currenttemp ? getIcon(currenttemp['weather'][0].description):getIcon('no')} alt="" width="48" />
                </div>
                <div className="degree">
                  {weatherdata ? (weatherdata[3].main.temp-273.15).toFixed(2) : ""}
                  <sup>o</sup>C
                </div>
                <small>
                {weatherdata ? (weatherdata[3].main.temp_min-273.15).toFixed(2) : ""}<sup>o</sup>C
                </small>
              </div>
            </div>
            <div className="forecast">
              <div className="forecast-header">
                <div className="day">
                  {weatherdata ? getDayname(weatherdata[4].dt_txt) : ""}
                </div>
              </div>{" "}
              <div className="forecast-content">
                <div className="forecast-icon">
                  <img src={currenttemp ? getIcon(currenttemp['weather'][0].description):getIcon('no')}alt="" width="48" />
                </div>
                <div className="degree">
                  {weatherdata ? (weatherdata[4].main.temp-273.15).toFixed(2) : ""}
                  <sup>o</sup>C
                </div>
                <small>
                {weatherdata ? (weatherdata[4].main.temp_min-273.15).toFixed(2) : ""}<sup>o</sup>C
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="map"
        style={{
          border: "0",
          height: "450px",
          width: "100%",
          overflow: "clip"
        }}
        className="container-map"
      />
      <div
        id="ww_6ee81aeb9dcc3"
        v="1.3"
        loc="id"
        a="{&quot;t&quot;:&quot;ticker&quot;,&quot;lang&quot;:&quot;en&quot;,&quot;sl_lpl&quot;:1,&quot;ids&quot;:[&quot;wl2998&quot;],&quot;font&quot;:&quot;Arial&quot;,&quot;sl_ics&quot;:&quot;one_a&quot;,&quot;sl_sot&quot;:&quot;celsius&quot;,&quot;cl_bkg&quot;:&quot;rgba(38,41,54,1)&quot;,&quot;cl_font&quot;:&quot;#FFFFFF&quot;,&quot;cl_cloud&quot;:&quot;#FFFFFF&quot;,&quot;cl_persp&quot;:&quot;#81D4FA&quot;,&quot;cl_sun&quot;:&quot;#FFC107&quot;,&quot;cl_moon&quot;:&quot;#FFC107&quot;,&quot;cl_thund&quot;:&quot;#FF5722&quot;}"
      >
        Weather Data Source:{" "}
        <a
          href="https://wetterlabs.de/wetter_addis_abeba/30_tage/"
          id="ww_6ee81aeb9dcc3_u"
          target="_blank"
        >
          wettervorhersage Addis Abeba 30 tage
        </a>
      </div>
      {/* =<script async src="https://app1.weatherwidget.org/js/?id=ww_6ee81aeb9dcc3"></script>				</div> */}

      <div className="fullwidth-block">
        <div className="container">
          <h1 className="title-news">featured news</h1>
          <div className="row">
            <div className="content col-md-4">
              <div className="post">
                <div className="featured-image">
                  <img src={fire} alt="" />
                </div>
                <h2 className="entry-title">
                  Rare 'triple-dip' La Niña is out of control on march
                </h2>

                <p className="p-news">
                La Niña was in part responsible for record-breaking rain in Australia, active hurricane seasons, and drought in East Africa.

A cooling of the Pacific Ocean, it has ended after three years.
Now forecasters are watching to see ...


                </p>
                <a href="https://www.bbc.com/news/science-environment-64950045" target={"_blank"}className="btn">
                  Read more
                </a>
              </div>
            </div>
            <div className="content col-md-4">
              <div className="post">
                <div className="featured-image">
                  <img src={drought} alt="" />
                </div>
                <h2 className="entry-title">
                  Drought risk to England regions after dry February
                </h2>
                <p className="p-news">
                Rivers in some of England and Wales ran their lowest on record for February, according to data from the UK Centre for Ecology and Hydrology.

England had its driest February for 30 years, according to the Met Office.
                </p>
                <a href="https://www.bbc.com/news/science-environment-64966953" target={"_blank"} className="btn">
                  Read more
                </a>
              </div>
            </div>
            <div className="content col-md-4">
              <div className="post">
                <div className="featured-image">
                  <img src={mozambique} alt="" />
                </div>
                <h2 className="entry-title">
                  The deadly cyclone that lasted more than a month
                </h2>
                <p className="p-news">
                More than 400 people have been killed and thousands of homes destroyed.

Freddy has been one of the longest-lived storms ever recorded in the Southern Hemisphere, if not the whole world.
                </p>
                <a href="https://www.bbc.com/news/world-africa-64978492" target={"_blank"} className="btn">
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="site-footer">
        <div className="container">
          <p className="colophon center">Copyright 2023. All rights reserved</p>
        </div>
      </footer>
    </div>
  ): "");
}
