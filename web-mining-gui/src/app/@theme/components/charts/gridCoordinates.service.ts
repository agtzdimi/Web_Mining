import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GridCoordinatesService {
  private gridCoordinates = [];

  private gridLinks = [];

  private timelineData = [];

  constructor() {}

  getGridCoordinates() {
    return this.gridCoordinates;
  }

  getGridLinks() {
    return this.gridLinks;
  }

  setCordinates(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]['lat']) {
        this.gridCoordinates.push({
          name: i.toString(),
          x: +data[i]['lon'],
          y: +data[i]['lat'],
          country: data[i]['location'],
          emotion: data[i]['emotion']['pred'][0],
          sentiment: data[i]['sentiment']['pred'],
        });
        this.gridLinks.push({
          name: i.toString(),
          source: i.toString(),
          target: i.toString(),
        });
      }
    }
  }

  setVoltage(nodesNumber) {
    for (let node = 0; node < nodesNumber; node++) {
      const tempTimelineData = [];
      for (let hour = 0; hour < 1; hour++) {
        tempTimelineData.push({
          hour: hour + 1,
          voltage: Math.round(Math.random() * 100 + 1),
          lineLoad: Math.round(Math.random() * 100 + 1),
        });
      }
      this.timelineData.push(tempTimelineData);
    }
  }

  getVoltage() {
    return this.timelineData;
  }
}
