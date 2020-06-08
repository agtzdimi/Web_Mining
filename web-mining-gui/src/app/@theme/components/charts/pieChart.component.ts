import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "ngx-pie-chart",
  template: ` <div echarts [options]="options" class="echart"></div> `,
})
export class PieChartComponent implements OnChanges {
  options: any;
  @Input() seriesData: Object;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.plotChart(changes);
  }

  plotChart(data) {
    console.log(data);
    const series = [];
    let pos = 0;
    let neg = 0;
    let neut = 0;
    for (let i = 0; i < data["seriesData"]["currentValue"].length; i++) {
      switch (data["seriesData"]["currentValue"][i]["sentiment"]) {
        case "Positive":
          pos++;
          break;
        case "Negative":
          neg++;
          break;
        case "Neutral":
          neut++;
          break;
      }
    }
    series.push({ name: "Negative", value: neg });
    series.push({ name: "Positive", value: pos });
    series.push({ name: "Neutral", value: neut });

    this.options = {
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)",
      },
      toolbox: {
        left: "center",
        feature: {
          dataView: {
            show: false,
            title: "Data View",
            readOnly: "true",
            lang: ["Data View", "Close", "Refresh"],
          },
          saveAsImage: {
            show: true,
            title: "Save",
          },
        },
      },
      legend: {
        type: "scroll",
        orient: "vertical",
        right: 10,
        top: "middle",
        bottom: 20,
        textStyle: {
          color: "#FFFFFF",
        },
      },
      series: [
        {
          type: "pie",
          radius: "55%",
          center: ["40%", "50%"],
          data: Object.values(series),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }
}
