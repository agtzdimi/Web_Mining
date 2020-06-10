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
  userProfileObj = {
    totalMale: 0,
    totalFemale: 0,
    totalMaleHate: 0,
    totalFemaleHate: 0,
    totalFemaleNotHate: 0,
    totalMaleNotHate: 0,
    totalYoung: 0,
    totalMiddleAged: 0,
    totalElder: 0,
    totalYoungHate: 0,
    totalElderHate: 0,
    totalMiddleAgedHate: 0,
    totalElderNotHate: 0,
    totalMiddleAgedNotHate: 0,
    totalYoungNotHate: 0,
  };
  data: any;
  ageBars: (string | number)[][];
  genderBars: (string | number)[][];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const url = 'http://localhost:9000/web-mining/rest/api/v1/retrieve_data';
    this.httpClient.get(url).subscribe(
      (data) => {
        // console.log(data);
        this.data = data;
        for (let i = 0; i < data['userProfiling']['tweets'].length; i++) {
          if (data['userProfiling']['tweets'][i]['age_group'] === 'Young') {
            this.userProfileObj['totalYoung']++;
            if (data['userProfiling']['tweets'][i]['hate_speech'] === '0') {
              this.userProfileObj['totalYoungNotHate']++;
            } else {
              this.userProfileObj['totalYoungHate']++;
            }
          } else if (
            data['userProfiling']['tweets'][i]['age_group'] === 'Middle_aged'
          ) {
            this.userProfileObj['totalMiddleAged']++;
            if (data['userProfiling']['tweets'][i]['hate_speech'] === '0') {
              this.userProfileObj['totalMiddleAgedNotHate']++;
            } else {
              this.userProfileObj['totalMiddleAgedHate']++;
            }
          } else if (
            data['userProfiling']['tweets'][i]['age_group'] === 'Elder'
          ) {
            this.userProfileObj['totalElder']++;
            if (data['userProfiling']['tweets'][i]['hate_speech'] === '0') {
              this.userProfileObj['totalElderNotHate']++;
            } else {
              this.userProfileObj['totalElderHate']++;
            }
          }

          if (data['userProfiling']['tweets'][i]['gender'] === 'male') {
            this.userProfileObj['totalMale']++;
            if (data['userProfiling']['tweets'][i]['hate_speech'] === '0') {
              this.userProfileObj['totalMaleNotHate']++;
            } else {
              this.userProfileObj['totalMaleHate']++;
            }
          } else if (
            data['userProfiling']['tweets'][i]['gender'] === 'female'
          ) {
            this.userProfileObj['totalFemale']++;
            if (data['userProfiling']['tweets'][i]['hate_speech'] === '0') {
              this.userProfileObj['totalFemaleNotHate']++;
            } else {
              this.userProfileObj['totalFemaleHate']++;
            }
          }
        }
        this.ageBars = [
          ['age', 'Total', 'No. of Hate', 'No. of Not Hate'],
          [
            'Young',
            this.userProfileObj['totalYoung'],
            this.userProfileObj['totalYoungHate'],
            this.userProfileObj['totalYoungNotHate'],
          ],
          [
            'Middle Aged',
            this.userProfileObj['totalMiddleAged'],
            this.userProfileObj['totalMiddleAgedHate'],
            this.userProfileObj['totalMiddleAgedNotHate'],
          ],
          [
            'Elder',
            this.userProfileObj['totalElder'],
            this.userProfileObj['totalElderHate'],
            this.userProfileObj['totalElderNotHate'],
          ],
        ];
        this.genderBars = [
          ['gender', 'Total', 'No. of Hate', 'No. of Not Hate'],
          [
            'Male',
            this.userProfileObj['totalMale'],
            this.userProfileObj['totalMaleHate'],
            this.userProfileObj['totalMaleNotHate'],
          ],
          [
            'Female',
            this.userProfileObj['totalFemale'],
            this.userProfileObj['totalFemaleHate'],
            this.userProfileObj['totalFemaleNotHate'],
          ],
        ];
      },
      (error) => {
        // console.log(error);
      },
    );
  }
}
