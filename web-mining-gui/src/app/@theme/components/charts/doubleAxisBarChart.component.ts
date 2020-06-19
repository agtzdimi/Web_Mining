import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "ngx-double-axis-bar-chart",
  template: `
    <div echarts [options]="options" class="echart"></div>
  `
})
export class DoubleAxisBarChartComponent implements OnChanges {
  @Input() barData;

  ngOnChanges(changes: SimpleChanges) {
    this.afterDataRecieved();
  }

  options: any = {};
  themeSubscription: any;

  constructor() {}

  afterDataRecieved() {
    let series = [];
    for (let i = 0; i < this.barData[0].length - 1; i++) {
      series.push({ type: "bar" });
    }
    this.options = {
      legend: {
        textStyle: {
          color: "white"
        }
      },
      tooltip: {},
      dataset: {
        source: this.barData
      },
      xAxis: {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "white"
          }
        },
        axisLabel: {
          color: "white",
          textStyle: {
            color: "white"
          }
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: "white"
          }
        },
        axisLabel: {
          color: "white",
          textStyle: {
            color: "white"
          }
        }
      },
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: series
    };
  }
}
