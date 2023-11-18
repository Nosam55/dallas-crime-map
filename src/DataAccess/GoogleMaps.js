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
import apiKeys from '../Secrets/APIKeys.json';
import { Loader } from '@googlemaps/js-api-loader'

const libraries = ["places"];

const dallasBias = {
  lat: 32.784046678697585, 
  lng: -96.78555028247597
}

let PlacesAPI;
let service;
let emptyMap;

async function init() {
  // Using Loader.instance here because google-map-react's GoogleMapReact element calls new Loader()
  const loader = Loader.instance;

  if(PlacesAPI === undefined){
    PlacesAPI = await loader.importLibrary("places");
  }

  if(emptyMap === undefined){
    const {Map} = await loader.importLibrary("maps");
    emptyMap = new Map(document.createElement('div'), {
      center: dallasBias,
      zoom: 8
    });
  }

  if(service === undefined){
    service = new PlacesAPI.PlacesService(emptyMap);
  }
}

/**
 * 
 * @param {string} address 
 * @returns Promise which resolves to an object with `lat()` and `lng()` methods
 */
async function searchLocationByAddress(address){
  // Initialize the Places API before attempting to use it
  // Prevents duplicating calls to Loader, which is breaking
  await init();

  const query = {
    query: address,
    fields: ["geometry"],
    locationBias: dallasBias
  }

  let placeLocation = null;

  service.findPlaceFromQuery(query, (result, status) => {
    console.log("findPlaceFromQuery callback ", status);

    if(result?.length > 0){
      placeLocation = result[0]?.geometry?.location;
    }

    if(result?.length > 1){
      console.warn(`FindPlaceFromQuery search returned ${result.length} results for '${address}'`);
    }
    else if(result?.length === 0 || !result?.length){
      console.error(`FindPlaceFromQuery search returned no results for ${address}`);
      placeLocation = undefined;
    }
  });

  // Return a promise that polls the value of placeLocation periodically until it is set.
  // Times out after a predetermined number of retries
  return new Promise((resolve, reject) => {
    const retries = 80;
    let count = 0;

    const intervalId = setInterval(function(){
      if(count >= retries){
        reject("error: timeout on ", address);
      }
      else{
        if(placeLocation !== null){
          clearInterval(intervalId);
          resolve(placeLocation);
        }
        count++;
      }
    }, 100);
  });
}

export {
  searchLocationByAddress
}