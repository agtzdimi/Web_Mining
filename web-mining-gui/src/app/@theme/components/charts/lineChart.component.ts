import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngx-line-chart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class LineChartComponent implements OnChanges {
  @Input() chartPrices: any;
  options: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.plotChart();
  }

  plotChart() {
    const gradientLimit = Math.max.apply(Math, this.chartPrices) / 2;

    this.options = {
      title: {
        /* text: 'Day-ahead prices', */
        x: 'center',
        textStyle: {
          color: '#FFFFFF',
        },
      },
      visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: gradientLimit,
        },
      ],
      // backgroundColor: "#808080",
      xAxis: {
        type: 'category',
        nameLocation: 'center',
        nameTextStyle: {
          color: '#FFFFFF',
          fontSize: 14,
        },
        nameGap: 40,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#bfbfbf',
          },
        },
        axisLabel: {
          rotate: 45,
        },
      },
      yAxis: {
        type: 'value',
        /* name: 'Price per MTU [EUR/MWh]', */
        nameLocation: 'center',
        nameTextStyle: {
          color: '#FFFFFF',
          fontSize: 14,
        },
        nameGap: 30,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#bfbfbf',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: echarts.tooltipBackgroundColor,
          },
        },
      },
      toolbox: {
        left: 'center',
        feature: {
          dataView: {
            show: false,
            title: 'Data View',
            readOnly: 'true',
            lang: ['Data View', 'Close', 'Refresh'],
          },
          saveAsImage: {
            show: true,
            title: 'Save',
          },
        },
      },
      series: [
        {
          data: this.chartPrices,
          type: 'line',
          smooth: true,
          /* label: {
              normal: {
                  show: true,
                  position: 'top',
                  color: '#bfbfbf'
              }
          }, */
          color: '#0033cc',
        },
      ],
    };
  }
}
