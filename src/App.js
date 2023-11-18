import React, { useState, useEffect, useRef } from 'react';
import CrimeMap from './Components/CrimeMap';
import Marker from './Components/Marker';
import FilterDropdown from './Components/FilterDropdown';
import { getActiveCalls } from './DataAccess/DallasOpenData';
import { searchLocationByAddress } from './DataAccess/GoogleMaps';
import './App.css';

function App(){
  const [markers, setMarkers] = useState([]);
  const [activeCalls, setActiveCalls] = useState([]);
  const [activeCallDetails, setActiveCallDetails] = useState(undefined);
  const markerArrayRef = useRef(null);

  function showDetails(activeCall){
    const detailStyle = {
      margin: "10px"
    }

    const detailsPane = (
      <div id="overlay" onClick={hideDetails} style={{ zIndex: "99", position: "fixed", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end", width: "30%", height: "auto", border: "2px solid black", backgroundColor: "#CCCCCC" }}>
          <h2 style={{ alignSelf: "center", justifySelf: "flex-start" }}>Incident Number {activeCall.incidentNumber}</h2>
          <p style={detailStyle}><strong>Beat No.:</strong> {activeCall.beat}</p>
          <p style={detailStyle}><strong>Block:</strong> {activeCall.block}</p>
          <p style={detailStyle}><strong>Date:</strong> {new Date(activeCall.date.split('T')[0] + "T" + activeCall.time).toLocaleString()}</p>
          <p style={detailStyle}><strong>Division:</strong> {activeCall.division}</p>
          <p style={detailStyle}><strong>Location:</strong> {activeCall.location}</p>
          <p style={detailStyle}><strong>Nature of Call:</strong> {activeCall.clarifyNatureOfCall()}</p>
          <p style={detailStyle}><strong>Priority No. (1-4):</strong> {activeCall.priority}</p>
          <p style={detailStyle}><strong>Reporting Area:</strong> {activeCall.reportingArea}</p>
          <p style={detailStyle}><strong>Status:</strong> {activeCall.status}</p>
          <p style={detailStyle}><strong>Responding Unit No.:</strong> {activeCall.unitNumber}</p>
        </div>
      </div>
    );

    setActiveCallDetails(detailsPane);
  }

  function hideDetails(evt){
    if(evt.target.id === "overlay"){
      setActiveCallDetails(undefined);
    }
  }

  function filterMarkers({property, value}) {
    console.log("updating filtered markers", property, value);
    const nextMarkerArray = markers.map(marker => {
      return (<Marker {...{
        ...marker.props,
        hidden: value && (marker.props.call[property] != value)
      }} />);
    });
    setMarkers(nextMarkerArray);
  }

  useEffect(() => {
    getActiveCalls()
      .then(calls => {
        let promises = [];
        for(let i = 0; i < calls.length; ++i){
          const address = !!(calls[i].block) ? `${calls[i].block} ${calls[i].location}` : `${calls[i].location}`;
          let promise = searchLocationByAddress(address).then(result => (result = {...result, activeCall: calls[i], address}));
          promises.push(promise);
        }

        setActiveCalls(calls);

        Promise.allSettled(promises)
          .then(coordsArray => {
            console.log('Promise Array ', coordsArray);

            const markerArray = coordsArray.map(promise => {
              const coords = promise.value;

              if(coords && typeof coords.lat === "function"){
                const call = coords.activeCall;
                const newMarker = (
                  <Marker key={call.incidentNumber} onClick={() => showDetails(call)} lat={coords.lat()} call={call} lng={coords.lng()}>
                    {`Beat: ${call.beat}`}
                    <br/>
                    {`Nature of Call: ${call.natureOfCall}`}
                    <br/>
                    {`Time: ${call.date?.replace('T00:00:00.000', '')}T${call.time}`}
                    <br/>
                    {`Location: ${coords.address}`}
                  </Marker>
                );

                return newMarker;
              }
            }).filter(x => !!x);

              console.log('setting markers', markerArray)
              const uniqueMarkerArray = [...new Set(markerArray)];
              setMarkers(uniqueMarkerArray);
              markerArrayRef.current = uniqueMarkerArray;
            });
          });
  }, []);

  console.log('render')

  return (
    <div className="App">
      <div className="App-header">
        <h2>Welcome to the DOD (Dallas OpenData) Police Scanner</h2>
        <div className='App-navbar'>
          <a href="#">Some text</a>
          <a href="about:blank">A link</a>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        {activeCallDetails}
        <CrimeMap width="50vw" height="37vw">
          {markers}
        </CrimeMap>
        <FilterDropdown onFilterChange={(filterObj) => {filterMarkers(filterObj);}} items={activeCalls} />
      </div>
    </div>
  );
}

export default App;
