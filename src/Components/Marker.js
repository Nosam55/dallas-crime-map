/* Dallas-Crime-Map is an interactive map of police
 * data from the Dallas OpenData project intended to make police
 * activity in Dallas County easier to observe. 
 *
 * Copyright 2023 Mason McCully (mmccully2000@gmail.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React, { useState } from "react";
import markerImage from "../Images/map-marker.png"

export default function Marker({lat, lng, children, onClick, ...props}){
  const [details, setDetails] = useState(<div/>);

  function showDetails(){
    const detailWindow = (
      <div style={{ zIndex: "100", padding: "3px", width: "120px", height: "90px", backgroundColor: "#999999", border: "1px solid black", position: "absolute", transform: "translate(-50%, calc(-100% - 35px))", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
        {children}
      </div>
    );

    setDetails(detailWindow);
  }
  
  function hideDetails(){
    setDetails(<div/>);
  }

  return (
    <div {...props} onClick={onClick} lat={lat} lng={lng} onMouseEnter={showDetails} onMouseLeave={hideDetails}>
      <img style={{ height: "30px", width: "auto", position: "absolute", transform: "translate(-50%, -100%)"}} src={markerImage}>
      </img>
      {details}
    </div>
    
  );
}