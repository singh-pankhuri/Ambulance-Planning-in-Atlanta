import './App.css';
import Maps from './Maps.js';
// import PageHeader from './PageHeader';
import React, { useEffect, useState } from 'react';

import './atlanta-img.png';
import {
  // existing imports
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import Results from './Results';
// import Filters from './Filters';
import Filters from './Filters.js';
import MapsDisplay from './MapsDisplay';
import axios from 'axios';
import { MapContainer } from './MapContainer';

export function OLDMakeApiCall(payload) {
  // const [isLoading, setLoading] = useState(true);
  // const [hospData, setHospData] = useState([]);
  axios.get(`http://127.0.0.1:5000/getOptimalPlacement`, { payload })
  .then(res => {
    console.log('Response from POST call: ', res);
    // console.log(res.data);
  })
  const response = ['yas'];
  return response;
}

function App() {
  // const MapWrapped = withScriptjs(withGoogleMap(Maps));

const [isLoading, setLoading] = useState(true);
const [hospData, setHospData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/getLatLongData').then(response => {
      var all_hospitals = response.data?.hospital_data;
      var places = [];
      all_hospitals.map( (point) => {
        const json_obj = {
          'lat': point[1],
          'lng': point[0]
        }
        places.push(json_obj);

      })
      setHospData(places);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  // return hospData;
  console.log('HospData: ', hospData)



  if (hospData.length > 1){
    console.log('Executing this')
  return (
    <>
    <div>
      <header className='App-header'>Optimizing Ambulance Response Times</header>
      <div className="float-container">
        <div class="float-child-left">
          <div className='lhs_filters'>
            <Filters/>
          </div>
        </div>
        <div class="float-child">
          {/* <img src={require('./atlanta-img.png')} /> */}
          <div className='map-container'>
        <MapsDisplay hosps={hospData}/>
        {/* <MapContainer /> */}
        </div>
      </div>
      </div>

      {/* < hr /> */}
      {/* <div className='map-container'>
        <MapsDisplay />
      </div> */}
       {/* <div>
        Shall I add map here?
        Shall I add map here?
        Shall I add map here?
        Shall I add map here?
      </div> */}
      {/* <div>
      
        <Results />
      </div> */}
    </div>
    </>
  );
}}

export default App;

      {/* <Maps/>
      <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCHy5yhyFcyRzaEQwyPnIA-mNTmHCBZHVs`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div> */}