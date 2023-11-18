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
class ActiveCall {
  constructor({beat, block, date, division, incident_number, location, nature_of_call, priority, reporting_area, status, time, unit_number}){
    this.beat = beat;
    this.block = block;
    this.date = date;
    this.division = division;
    this.incidentNumber = incident_number;
    this.location = location;
    this.natureOfCall = nature_of_call;
    this.priority = priority;
    this.reportingArea = reporting_area;
    this.status = status;
    this.time = time;
    this.unitNumber = unit_number;
  }

  clarifyNatureOfCall(){
    // Nature of Call is in form "<code> - <short_description>"
    const code = this.natureOfCall.split('-')[0].trim();

    /*
     * The values in this table are largely sourced from this quizlet set by user doleary13k:
     * https://quizlet.com/425402678/dallas-pd-radio-signals-codes-channels-flash-cards/?funnelUUID=856325df-59f2-498e-9615-696a9738b13b
     */
    switch(code){
      case "BCA":
        return "BCA - Bait Car Activation";
      case "CT":
        return "CT - Criminal Trespass";
      case "DAEV":
        return "DAEV - Disturbance, Armed Encounter, Suspect in Vehicle";
      case "DAEF":
        return "DAEF - Disturbance, Armed Encounter, Suspect on Foot";
      case "DASV":
        return "DASV - Disturbance Active Shooter in Vehicle, HIGHEST PRIORITY";
      case "DASF":
        return "DASF - Disturbance Active Shooter on Foot, HIGHEST PRIORITY";
      case "DH":
        return "DH - Drug House";
      case "OADS":
        return "OADS - Open Air Drug Sale";
      case "SIP":
        return "SIP - Sleeping in Public";
      case "4":
        return "4 - Hang Up Call";
      case "6":
        return "6 - Disturbance, General";
      case "6F":
        return "6F - Fireworks Disturbance";
      case "6G":
        return "6G - Random Gunfire";
      case "6M":
        return "6M - Disturbance Loud Music";
      case "6X":
        return "6X - Major Disturbance, General";
      case "6XA":
        return "6XA - Major Disturbance, Ambulance Dispatched";
      case "6X/01":
        return "6X/01 - AWARE Family Violence Alarm";
      case "6XE":
        return "6XE - Major Disturbance Violence, HIGHEST PRIORITY";
      case "6XEA":
        return "6XEA - Disturbance, Emergency, Ambulance dispatched"
      case "7":
        return "7 - Minor Accident";
      case "7CE":
        return "7CE - Accident w/ City Equipment";
      case "7X":
        return "7X - Accident w/ Injury";
      case "7XF":
        return "7XF - Major Accident on Freeway";
      case "7XFCE":
        return "7XFCE - Major Accident on Freeway w/ City Equipment";
      case "8":
        return "8 - Unknown";
      case "8":
        return "8 - Intoxicated Person";
      case "9":
        return "9 - Theft, General";
      case "9/01":
        return "9/01 - Theft (Just Occurred), General";
      case "11B":
        return "11B - Burglary of a Business";
      case "11B/01":
        return "11B/01 - Burglary of a Business (Just Occurred)";
      case "11C":
        return "11C - Burglary of a Coin Operated Machine";
      case "11C/01":
        return "11C/01 - Burglary of a Coin Operated Machine (Just Occurred)";
      case "11R":
        return "11R - Burglary of a Residence";
      case "11R/01":
        return "11R/01 - Burglary of a Residence (Just Occurred)";
      case "11V":
        return "11V - Burglary of a Motor Vehicle";
      case "11V/01":
        return "11V/01 - Burglary of a Motor Vehicle (Just Occurred)";
      case "12":
        return "12 - Burglar Alarm, General";
      case "12R":
        return "12R - Residential Burglar Alarm";
      case "12B":
        return "12B - Business Burglar Alarm";
      case "13":
        return "13 - Prowler";
      case "14":
        return "14 - Cutting/Stabbing, HIGHEST PRIORITY";
      case "15":
        return "15 - Assist Officer, HIGHEST PRIORITY";
      case "15A":
        return "15A - Assist Officer with Ambulance, HIGHEST PRIORITY";
      case "16":
        return "16 - Injured Person";
      case "16A":
        return "16A - Injured Person, Ambulance dispatched";
      case "17":
        return "17 - Kidnapping in Progress, HIGHEST PRIORITY";
      case "17C":
        return "17C - Kidnapping of Child in Progress, HIGHEST PRIORITY";
      case "18":
        return "18 - Structure Fire";
      case "18A":
        return "18A - Vehicle Fire";
      case "19":
        return "19 - Shooting, HIGHEST PRIORITY";
      case "20":
        return "20 - Robbery";
      case "21":
        return "21 - Holdup Alarm";
      case "21B":
        return "21B - Business Holdup Alarm";
      case "21R":
        return "21R - Residential Panic Alarm";
      case "22":
        return "22 - Animal Complaint";
      case "22A":
        return "22A - Animal Attack";
      case "23":
        return "23 - Parking Violation";
      case "24":
        return "24 - Abandoned Property";
      case "25":
        return "25 - Criminal Assault";
      case "25R":
        return "25R - Criminal Assault +72 hours ago";
      case "26":
        return "26 - Missing Person";
      case "26/01":
        return "26/01 - Missing Person Critical";
      case "27":
        return "27 - Dead Person";
      case "28":
        return "28 - Sick Person/Open Carry?";
      case "29":
        return "29 - Open Building";
      case "30":
        return "30 - Prisoner";
      case "30/01":
        return "30/01 - Off Duty Officer with Prisoner";
      case "30D":
        return "30D - Prisoner Other Agency";
      case "31":
        return "31 - Criminal Mischief";
      case "31/01":
        return "31/01 - Criminal Mischief in Progress";
      case "32":
        return "32 - Suspicious Person";
      case "33":
        return "33 - Prostitution";
      case "34":
        return "34 - Suicide";
      case "35":
        return "35 - Terrorist Incident";
      case "36":
        return "36 - Abandoned Child";
      case "36/01":
        return "36/01 - Abandoned Child, Critical";
      case "37":
        return "37 - Street Blockage";
      case "37F":
        return "37F - Freeway Blockage";
      case "38":
        return "38 - Meet Complainant";
      case "39":
        return "39 - Racing";
      case "40":
        return "40 - Other";
      case "40/01":
        return "40/01 - Other Caution is Advised";
      case "09V":
        return "09V - Unauthorized Use of Motor Vehicle in Progress";
      case "09V-01":
        return "09V - Unauthorized Use of Motor Vehicle, Just Occurred";
      case "41/11V":
        return "41/11V - Burglary of a Motor Vehicle in Progress";
      case "41/11B":
        return "41/11B - Burglary of a Business in Progress";
      case "41/11R":
        return "41/11R - Burglary of a Residence in Progress";
      case "41/40":
        return "41/40 - Other in Progress, HIGHEST PRIORITY";
      case "42":
        return "42 - Pursuit";
      case "43":
        return "43 - Road Rage";
      case "44":
        return "44 - Person in Danger, HIGHEST PRIORITY";
      case "45":
        return "45 - Response Team Activation";
      case "46":
        return "46 - Mental Illness, Crisis Intervention Team responding";
      case "46A":
        return "46A - Mental Illness, Ambulance dispatched, Crisis Intervention Team responding";
      case "70":
        return "70 - ETS Activation, Gunshot Detection?";
      case "Code 3":
        return "Code 3 - Emergency Lights and Sirens";
      case "Code 4":
        return "Code 4 - Disregard";
      case "Code 5":
        return "Code 5 - En route";
      case "Code 6":
        return "Code 6 - Arrived";
      case "Code 10":
        return "Code 10 - Known Offender";
      case "Code 10C":
        return "Code 10C - Known Dangerous Offender";
      case "Code 10S":
        return "Code 10S - Registered Sex Offender";
      case "Code 10W":
        return "Code 10W - Felony Warrant";
      case "Code 10X":
        return "Code 10X - Stolen Vehicle";
      case "50":
        return "50 - Meal Break";
      case "51":
        return "51 - Coffee Break";
      case "52":
        return "52 - City Court";
      case "53":
        return "53 - County Court";
      case "55":
        return "55 - Stopping Traffic Violator";
      case "56":
        return "56 - Out to the Station";
      case "57":
        return "57 - Out to the Garage";
      case "58":
        return "58 - Routine Investigation";
      case "59":
        return "59 - Follow-Up Investigation";
      case "60":
        return "60 - Special Assignment";
      case "61":
        return "61 - Foot Patrol";
      case "62":
        return "62 - Public Service";
      case "63":
        return "63 - Cover Element";
      case "64":
        return "64 - Out to Radio Shop";
      case "65":
        return "65 - Use Telephone";
      case "66":
        return "66 - End Tour of Duty";
      case "Channel 1":
        return "Channel 1 - Central";
      case "Channel 2":
        return "Channel 2 - North East";
      case "Channel 3":
        return "Channel 3 - South East";
      case "Channel 4":
        return "Channel 4 - South West";
      case "Channel 5":
        return "Channel 5 - North West";
      case "Channel 6":
        return "Channel 6 - North Central";
      case "Channel 7":
        return "Channel 7 - South Central";
      case "16":
        return "16 - Injured Person";
      default:
        return this.natureOfCall;
    }
  }
}

export default ActiveCall;