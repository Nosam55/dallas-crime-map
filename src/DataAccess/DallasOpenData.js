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