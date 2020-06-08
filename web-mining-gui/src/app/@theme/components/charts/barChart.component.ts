import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngx-bar-chart',
  template: ` <div echarts [options]="options" class="echart"></div> `,
})
export class BarChartComponent implements OnChanges {
  @Input() barData;
  @Input() titles;

  ngOnChanges(changes: SimpleChanges) {
    this.afterDataRecieved();
  }

  options: any = {};
  themeSubscription: any;

  constructor() {}

  afterDataRecieved() {
    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'grey',
          },
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      barWidth: '40%',
      itemStyle: {
        color: '#cccccc',
      },
      xAxis: {
        type: 'category',
        data: this.titles,
        axisLine: {
          lineStyle: {
            color: 'white',
          },
        },
        axisLabel: {
          color: 'white',
          rotate: 75,
          textStyle: {
            color: 'white',
          },
        },
      },
      yAxis: {
        type: 'value',
        name: 'No. of Posts',
        axisLine: {
          lineStyle: {
            color: 'white',
          },
        },
        axisLabel: {
          color: 'white',
          textStyle: {
            color: 'white',
          },
        },
      },
      series: [
        {
          data: this.barData,
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                const colorList = [
                  '#C1232B',
                  '#B5C334',
                  '#FCCE10',
                  '#E87C25',
                  '#27727B',
                  '#FE8463',
                  '#9BCA63',
                  '#FAD860',
                  '#F3A43B',
                  '#60C0DD',
                  '#D7504B',
                  '#C6E579',
                  '#F4E001',
                  '#F0805A',
                  '#26C0C0',
                ];
                return colorList[params.dataIndex];
              },
              label: {
                show: false,
                position: 'top',
                formatter: '{b}\n{c}',
              },
            },
          },
          barStyle: { color: '#d5ceeb' },
          type: 'bar',
        },
      ],
    };
  }
}
