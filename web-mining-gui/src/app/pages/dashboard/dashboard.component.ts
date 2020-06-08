import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  lineChart = [1, 2, 3, 5, 4, 6, 6, 4, 6, 1, 2, 3, 2, 5, 6];
  pieSeriesData = [
    { sentiment: 'Positive' },
    { sentiment: 'Negative' },
    { sentiment: 'Neutral' },
    { sentiment: 'Neutral' },
    { sentiment: 'Neutral' },
    { sentiment: 'Neutral' },
    { sentiment: 'Neutral' },
    { sentiment: 'Negative' },
  ];
  barChartData = [8, 20, 44, 22, 66, 55, 44, 32, 33, 51, 48];
  barChartTitles = [
    'anger',
    'anticipation',
    'disgust',
    'fear',
    'joy',
    'love',
    'optimism',
    'pessimism',
    'sadness',
    'surprise',
    'trust',
  ];
  data: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const url = 'http://localhost:9000/web-mining/rest/api/v1/retrieve_data';
    this.httpClient.get(url).subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        // console.log(error);
      },
    );
  }
}
