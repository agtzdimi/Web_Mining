import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from "@angular/core";
import { GridCoordinatesService } from "./gridCoordinates.service";

import "mapbox-echarts";

@Component({
  selector: "ngx-simulation-nodes",
  template: ` <div echarts [options]="options" class="echarts"></div> `,
})
export class GraphChartComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dates;

  // Graph Data
  private gridData = [];
  private gridLinks = [];
  private gridCoords = [];

  // Echarts options
  options: any = [];

  // Mapbox parameters
  private mapCenter: any = { lng: 0, lat: 0 };
  private sw: any = { lng: 0, lat: 0 };
  private ne: any = { lng: 0, lat: 0 };

  // themeSubscription: any;

  constructor(gridService: GridCoordinatesService) {
    // Grid coordinates and the links between them (Graph's nodes and edges)
    this.gridLinks = gridService.getGridLinks();
    this.gridCoords = gridService.getGridCoordinates();

    // Calculate dummy values (TODO: read the values from a file)
    gridService.setVoltage(this.gridLinks.length);
    this.gridData = gridService.getVoltage();
  }

  ngOnInit() {
    this.initializeGraph();
    this.setData(this.gridData, this.gridCoords, this.gridLinks);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.data.currentValue) {
    //     this.afterDataRecieved(changes.data.currentValue);
    // }
  }

  ngOnDestroy(): void {
    // this.themeSubscription.unsubscribe();
  }

  getMapBounts() {
    // Mapbox's bounds explanation
    //                                   +---------+  <- [max_longitude, max_latitude]
    //                                   |         |
    //                                   |         |
    //                                   |         |
    // [min_longitude, min_latitude] ->  +---------+

    // Get minimum and maximum longitude and latitude
    const minLongitude = Math.min.apply(
      Math,
      this.gridCoords.map(function (o) {
        return o.x;
      })
    );
    const minLatitude = Math.min.apply(
      Math,
      this.gridCoords.map(function (o) {
        return o.y;
      })
    );
    const maxLongitude = Math.max.apply(
      Math,
      this.gridCoords.map(function (o) {
        return o.x;
      })
    );
    const maxLatitude = Math.max.apply(
      Math,
      this.gridCoords.map(function (o) {
        return o.y;
      })
    );

    // Calculate graph's margins (10% from 'farthest' nodes)
    const marginLongitude = Math.abs(maxLongitude - minLongitude) * 0.1;
    const marginLatitude = Math.abs(maxLatitude - minLatitude) * 0.1;

    // Set southwest longitude using minimum longitude of all nodes
    this.sw.lng = minLongitude - marginLongitude;
    // Set southwest latitude using minimum latitude of all nodes
    this.sw.lat = minLatitude - marginLatitude * 2; // Double the marging to not override the slider
    // Set northeast longitude using maximum longitude of all nodes
    this.ne.lng = maxLongitude + marginLongitude;
    // Set northeast latitude using maximum latitude of all nodes
    this.ne.lat = maxLatitude + marginLatitude;

    // Set Center of the map
    this.mapCenter = {
      lng: (maxLongitude + minLongitude) / 2,
      lat: (maxLatitude + minLatitude) / 2,
    };
  }

  updateMapbox() {
    // Mapbox's parameters
    return {
      center: [this.mapCenter.lng, this.mapCenter.lat],
      zoom: 1, // 13 = region
      // bounds: [this.sw.lng, this.sw.lat, this.ne.lng, this.ne.lat],
      roam: true,
      style: "mapbox://styles/mapbox/light-v10", // stylesheet location
    };
  }

  initializeGraph() {
    // Initialize Mapbox's bounds
    this.getMapBounts();

    // Initialize Echarts options
    this.options = {
      // Timeline Element
      timeline: {
        axisType: "value",
        autoPlay: false,
        playInterval: 2000,
        controlStyle: { position: "left" },
        data: [],
      },

      // Echarts base options
      baseOption: {
        // title: { text: "Electric Grid" },
        tooltip: {},
        animation: false,

        // Set tmap as Echarts's Coordinate System
        tmap: this.updateMapbox(),

        // Base options of all series
        series: [
          {
            id: "SentimentGraph",
            name: "Sentiment Graph",
            type: "graph",

            coordinateSystem: "tmap",

            // roam: true, //'zoom',
            // layout: 'force', //'circular', 'force', 'node' (default)
            symbol: "circle", // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            focusNodeAdjacency: true, // If true, then echarts highlights nodes' dependancies
            edgeSymbol: ["none", "none"],

            itemStyle: {
              borderColor: "black",
              borderWidth: 0.3,
              borderType: "solid",
              opacity: 1,
            },

            lineStyle: {
              color: "black",
              type: "solid",
              opacity: 0.8,
              curveness: 0,
            },

            tooltip: {
              position: "right",
              formatter: function (params) {
                // Initialize label
                let label = "";
                if (params.dataType === "node") {
                  // Nodes' label
                  label =
                    "Tweet No.: " +
                    params.name +
                    "<br/>" +
                    "Country: " +
                    params.value[2] +
                    "<br/>" +
                    "Top Emotion: " +
                    params.value[3] +
                    "<br/>" +
                    "Sentiment: " +
                    params.value[4];
                }

                return label;
              },
            },
          },
        ],
      },

      // Base options of the echart
      options: [],
    };
  }

  setData(graphData: any, graphCoord: any, graphLinks: any) {
    // Update echarts's options
    for (let hour = 0; hour < this.dates.length; hour++) {
      // Add timeStamp to echarts's timeline (slider)
      this.options.timeline.data.push(this.dates[hour]);
      // Add timeStamp's series to echart
      this.options.options.push(
        this.getOption(graphData, graphCoord, graphLinks, this.dates[hour])
      );
    }
  }

  getOption(graphData: any, graphCoord: any, graphLinks: any, timeStamp: any) {
    // echarts series for a specific timeStamp
    const series = [];
    // echarts data for a specific timeStamp (3D array: longitude, latitude and value of the node)
    const data = [];
    // echarts links for a specific timeStamp
    const links = [];

    // Set echarts Data
    //
    for (let node = 0; node < graphCoord.length; node++) {
      if (timeStamp === graphCoord[node]["timestamp"]) {
        data.push({
          name: graphCoord[node]["name"],
          value: [
            graphCoord[node]["x"],
            graphCoord[node]["y"],
            graphCoord[node]["country"],
            graphCoord[node]["emotion"],
            graphCoord[node]["sentiment"],
          ],
        });
      }
    }

    // Set links
    for (let node = 0; node < graphLinks.length; node++) {
      // Map line's width of the egde to Width Range based on the edge's value
      // [a, b] => (b - a) * (x - min(x)) / (max(x) - min(x)) + a
      // Push node's link to links array
      if (timeStamp === graphLinks[node]["timestamp"]) {
        links.push({
          name: graphLinks[node]["name"],
          source: graphLinks[node]["source"],
          target: graphLinks[node]["target"],
        });
      }
    }

    // Set echarts Series
    //
    series.push({
      data,
      links,
      // Calculate nodes' symbol's size based on its value
      symbolSize: function (v) {
        return 10;
      },
      itemStyle: {
        // Calculate nodes' color based on its value
        color: function (params) {
          // Change node's color in case the value is larger than the threshold
          return "#c72c41";
        },
      },
    });

    // Return series
    return {
      title: { subtext: "Timestamp: " + timeStamp }, // Series subtitle
      series: series,
    };
  }

  afterDataRecieved(dataFromCsv) {
    // this.setData();
  }
}
