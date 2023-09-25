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
}

export default ActiveCall;