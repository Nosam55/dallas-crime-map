import ActiveCall from "../Model/ActiveCall";

const ActiveCallsUrl = "https://www.dallasopendata.com/resource/9fxf-t2tr.json";

async function getActiveCalls(){
  let response = await fetch(ActiveCallsUrl);
  let activeCalls = await response.json();

  for(let i = 0; i < activeCalls.length; ++i){
    activeCalls[i] = new ActiveCall(activeCalls[i]);
  }
  
  // "N Central Serv Nb / Monticello Ave"
  // Remove all " [NSEW]b " and all " Serv " 
  return activeCalls;
}

async function getIncidentByNumber(incidentNumber){

}

export {
  getActiveCalls
};