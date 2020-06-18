import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "ngx-bar-chart",
  template: ` <div echarts [options]="options" class="echart"></div> `,
})
export class BarChartComponent implements OnChanges {
  @Input() barData;
  @Input() titles;
  @Input() axisTitle;

  ngOnChanges(changes: SimpleChanges) {
    this.afterDataRecieved();
  }

  options: any = {};
  themeSubscription: any;

  constructor() {}

  afterDataRecieved() {
    this.options = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "grey",
          },
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      barWidth: "40%",
      itemStyle: {
        color: "#cccccc",
      },
      xAxis: {
        type: "category",
        data: this.titles,
        axisLine: {
          lineStyle: {
            color: "white",
          },
        },
        axisLabel: {
          color: "white",
          rotate: 75,
          textStyle: {
            color: "white",
          },
        },
      },
      yAxis: {
        type: "value",
        name: this.axisTitle,
        axisLine: {
          lineStyle: {
            color: "white",
          },
        },
        axisLabel: {
          color: "white",
          textStyle: {
            color: "white",
          },
        },
      },
      dataZoom: [
        {
          type: "inside",
          show: true,
          start: 0,
          end: 25,
        },
        {
          start: 0,
          end: 25,
          handleIcon: `M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4
v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z`,
          handleSize: "80%",
          handleStyle: {
            color: "#fff",
            shadowBlur: 3,
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
      ],
      series: [
        {
          data: this.barData,
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                const colorList = [
                  "#C1232B",
                  "#B5C334",
                  "#FCCE10",
                  "#E87C25",
                  "#27727B",
                  "#FE8463",
                  "#9BCA63",
                  "#FAD860",
                  "#F3A43B",
                  "#60C0DD",
                  "#D7504B",
                  "#C6E579",
                  "#F4E001",
                  "#F0805A",
                  "#26C0C0",
                ];
                return colorList[params.dataIndex];
              },
              label: {
                show: false,
                position: "top",
                formatter: "{b}\n{c}",
              },
            },
          },
          barStyle: { color: "#d5ceeb" },
          type: "bar",
        },
      ],
    };
  }
}
