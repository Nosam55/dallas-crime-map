import React, { useState } from 'react';
import CrimeMap from './Components/CrimeMap';
import Marker from './Components/Marker';
import { getActiveCalls } from './DataAccess/DallasOpenData';
import { searchLocationByAddress } from './DataAccess/GoogleMaps';
import logo from './logo.svg';
import './App.css';

function searchForHome() {
  searchLocationByAddress("333 Melrose Drive")
    .then(result => console.log(result))
    .catch(err => console.error(err));
}

function App(){
  const addHomeMarker = () => {
    searchLocationByAddress("333 Melrose Drive")
      .then(coords => {
        setMarkers([...markers, <Marker lat={coords.lat()} lng={coords.lng()}>Home</Marker>]);
      });
  }

  const [markers, setMarkers] = useState([]);

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CrimeMap height="33vw" width="50%">
          {markers}
        </CrimeMap>
      </div>
      <div>
        <button onClick={addHomeMarker}>Search for Home</button>
      </div>
    </div>
  );
}

export default App;
