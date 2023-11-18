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