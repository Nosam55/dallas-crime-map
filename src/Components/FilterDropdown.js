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
import React, { useEffect, useState } from "react";

export default function FilterDropdown({ items, onFilterChange }) {
  const [allProperties, setAllProperties] = useState({});
  const [selectedProperty, setSelectedProperty] = useState(undefined);
  const [selectedValue, setSelectedValue] = useState(undefined);

  useEffect(() => {
    let updatedProps = {};

    for(let i = 0; i < items.length; ++i){
      const item = items[i];
      const properties = Object.keys(item);
  
      for(let ii = 0; ii < properties.length; ++ii){
        const property = properties[ii];
        
        if(!updatedProps[property]){
          updatedProps[property] = new Set();
        }
  
        updatedProps[property].add(item[property]);
      }
    }

    setAllProperties(updatedProps);
  }, [items]);
  
  function updateFilter(filterValue){
    setSelectedValue(filterValue);
    onFilterChange({property: selectedProperty, value: filterValue});
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <select onChange={(evt) => {setSelectedProperty(evt.target.value)}}>
        <option value="none">Select...</option>
      {
        Object.keys(allProperties).map((key) => {
          return <option key={key} value={key}>{key}</option>
        })
      }
      </select> 
      <span style={{ marginLeft: "5px", marginRight: "5px" }}>
        ==
      </span>
      <select 
        onChange={(evt) => {updateFilter(evt.target.value)}}
        disabled={!allProperties[selectedProperty]}
      >
        <option value="none">Select...</option>
        {
          // If allProperties[selectedProperty] is not null, then render the options
          allProperties[selectedProperty] ?
          [...allProperties[selectedProperty]].sort().map((value) => {
            return <option key={value} value={value}>{value}</option>
          })
          :
          ""
        }
      </select>
      <button style={{ marginLeft: "5px" }} onClick={() => {setSelectedProperty(null); updateFilter(null)}}>Clear</button>
    </div>
  );
}