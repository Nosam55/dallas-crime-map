import ActiveCall from "../Model/ActiveCall";

const ActiveCallsUrl = "https://www.dallasopendata.com/resource/9fxf-t2tr.json";

async function getActiveCalls(){
  let response = await fetch(ActiveCallsUrl);
  let activeCalls = await response.json();

  for(let i = 0; i < activeCalls.length; ++i){
    activeCalls[i] = new ActiveCall(activeCalls[i]);

    // "N Central Serv Nb / Monticello Ave"
    // Remove all " [NSEW]b " and all " Serv "
    activeCalls[i].location = activeCalls[i].location.replace(" Serv ", " ").replace(/ [NSEW][Bb] /, " ");

  }
  
  // Remove Duplicates
  let activeCallsMap = new Map();
  activeCalls.forEach(element => {
    activeCallsMap.set(element.incidentNumber, element);
  });

  return Array.from(activeCallsMap.values());
}

async function getIncidentByNumber(incidentNumber){

}

export {
  getActiveCalls
};