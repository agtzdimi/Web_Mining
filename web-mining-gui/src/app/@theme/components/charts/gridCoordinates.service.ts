import { Injectable } from '@angular/core';

@Injectable()
export class GridCoordinatesService {
  private gridCoordinates = [
    { name: 'Node 1', x: 2.349014, y: 48.864716 }, // Paris
    { name: 'Node 2', x: 13.404954, y: 52.520008 }, // Berlin
    { name: 'Node 3', x: -3.70379, y: 40.416775 }, // Madrid
    { name: 'Node 4', x: 12.51133, y: 41.89193 }, // Rome
    { name: 'Node 5', x: 23.71622, y: 37.97945 }, // Athens
    { name: 'Node 6', x: 26.333332, y: 39.166666 }, // Lesvos
    { name: 'Node 7', x: 22.920227, y: 40.736851 }, // Thessaloniki
    { name: 'Node 8', x: 16.363449, y: 48.210033 }, // Vienna
  ];

  private gridLinks = [
    { name: 'Node 1', source: 'Node 1', target: 'Node 2' },
    { name: 'Node 2', source: 'Node 2', target: 'Node 3' },
    { name: 'Node 3', source: 'Node 2', target: 'Node 3' },
    { name: 'Node 4', source: 'Node 1', target: 'Node 4' },
    { name: 'Node 5', source: 'Node 3', target: 'Node 5' },
    { name: 'Node 6', source: 'Node 5', target: 'Node 6' },
    { name: 'Node 7', source: 'Node 4', target: 'Node 7' },
    { name: 'Node 8', source: 'Node 4', target: 'Node 8' },
  ];

  private timelineData = [];

  constructor() {}

  getGridCoordinates() {
    return this.gridCoordinates;
  }

  getGridLinks() {
    return this.gridLinks;
  }

  setVoltage(nodesNumber) {
    for (let node = 0; node < nodesNumber; node++) {
      const tempTimelineData = [];
      for (let hour = 0; hour < 24; hour++) {
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
