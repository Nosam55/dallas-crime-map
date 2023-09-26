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