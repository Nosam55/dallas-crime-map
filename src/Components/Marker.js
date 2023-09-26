import React, { useState } from "react";
import markerImage from "../Images/map-marker.png"

export default function Marker({lat, lng, children, onClick}){
  const [details, setDetails] = useState(<div/>);

  function showDetails(){
    const detailWindow = (
      <div style={{ width: "120px", height: "90px", backgroundColor: "#999999", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
        {children}
      </div>
    );

    setDetails(detailWindow);
  }
  
  function hideDetails(){
    setDetails(<div/>);
  }

  return (
    <div onClick={onClick} lat={lat} lng={lng} onMouseEnter={showDetails} onMouseLeave={hideDetails}>
      <img style={{ height: "30px", width: "auto", position: "absolute", transform: "translate(-50%, -100%)"}} src={markerImage}>
      </img>
      {details}
    </div>
    
  );
}