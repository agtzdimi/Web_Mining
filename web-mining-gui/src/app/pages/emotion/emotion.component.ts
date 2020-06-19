import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "ngx-emotion",
  templateUrl: "./emotion.component.html",
  styleUrls: ["./emotion.component.scss"],
})
export class EmotionComponent implements OnInit {
  twitterPieSeriesData = [];
  instaPieSeriesData = [];
  twitterBarChartData = {
    anger: 0,
    anticipation: 0,
    disgust: 0,
    fear: 0,
    joy: 0,
    love: 0,
    optimism: 0,
    pessimism: 0,
    sadness: 0,
    surprise: 0,
    trust: 0,
  };
  instaBarChartData = {
    anger: 0,
    anticipation: 0,
    disgust: 0,
    fear: 0,
    joy: 0,
    love: 0,
    optimism: 0,
    pessimism: 0,
    sadness: 0,
    surprise: 0,
    trust: 0,
  };
  twitterBarData = [];
  instaBarData = [];
  barTitles = [];
  data: any;
  mapDataSet: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const url = "http://localhost:9000/web-mining/rest/api/v1/retrieve_data";
    this.httpClient.get(url).subscribe(
      (data) => {
        this.data = data;
        for (let i = 0; i < data["tweets"].length; i++) {
          
          // Sentiment Calculation
          if (data["tweets"][i]["sentiment"]["pred"] === "neutral") {
            this.twitterPieSeriesData.push({ sentiment: "Neutral" });
          } else if (data["tweets"][i]["sentiment"]["pred"] === "positive") {
            this.twitterPieSeriesData.push({ sentiment: "Positive" });
          } else {
            this.twitterPieSeriesData.push({ sentiment: "Negative" });
          }

          // Emotion Calculation
          if (data["tweets"][i]["emotion"]["pred"].includes("joy")) {
            this.twitterBarChartData["joy"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("anger")) {
            this.twitterBarChartData["anger"] += 1;
          } else if (
            data["tweets"][i]["emotion"]["pred"].includes("anticipation")
          ) {
            this.twitterBarChartData["anticipation"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("disgust")) {
            this.twitterBarChartData["disgust"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("fear")) {
            this.twitterBarChartData["fear"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("love")) {
            this.twitterBarChartData["love"] += 1;
          } else if (
            data["tweets"][i]["emotion"]["pred"].includes("optimism")
          ) {
            this.twitterBarChartData["optimism"] += 1;
          } else if (
            data["tweets"][i]["emotion"]["pred"].includes("pessimism")
          ) {
            this.twitterBarChartData["pessimism"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("sadness")) {
            this.twitterBarChartData["sadness"] += 1;
          } else if (
            data["tweets"][i]["emotion"]["pred"].includes("surprise")
          ) {
            this.twitterBarChartData["surprise"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("trust")) {
            this.twitterBarChartData["trust"] += 1;
          }

        }

        // Instagram

        for (let i = 0; i < data["instagram"].length; i++) {
          
          // Sentiment Calculation
          if (data["instagram"][i]["sentiment"]["pred"] === "neutral") {
            this.instaPieSeriesData.push({ sentiment: "Neutral" });
          } else if (data["instagram"][i]["sentiment"]["pred"] === "positive") {
            this.instaPieSeriesData.push({ sentiment: "Positive" });
          } else {
            this.instaPieSeriesData.push({ sentiment: "Negative" });
          }

          // Emotion Calculation
          if (data["instagram"][i]["emotion"]["pred"].includes("joy")) {
            this.instaBarChartData["joy"] += 1;
          } else if (data["instagram"][i]["emotion"]["pred"].includes("anger")) {
            this.instaBarChartData["anger"] += 1;
          } else if (
            data["instagram"][i]["emotion"]["pred"].includes("anticipation")
          ) {
            this.instaBarChartData["anticipation"] += 1;
          } else if (data["instagram"][i]["emotion"]["pred"].includes("disgust")) {
            this.instaBarChartData["disgust"] += 1;
          } else if (data["instagram"][i]["emotion"]["pred"].includes("fear")) {
            this.instaBarChartData["fear"] += 1;
          } else if (data["instagram"][i]["emotion"]["pred"].includes("love")) {
            this.instaBarChartData["love"] += 1;
          } else if (
            data["instagram"][i]["emotion"]["pred"].includes("optimism")
          ) {
            this.instaBarChartData["optimism"] += 1;
          } else if (
            data["instagram"][i]["emotion"]["pred"].includes("pessimism")
          ) {
            this.instaBarChartData["pessimism"] += 1;
          } else if (data["instagram"][i]["emotion"]["pred"].includes("sadness")) {
            this.instaBarChartData["sadness"] += 1;
          } else if (
            data["instagram"][i]["emotion"]["pred"].includes("surprise")
          ) {
            this.instaBarChartData["surprise"] += 1;
          } else if (data["instagram"][i]["emotion"]["pred"].includes("trust")) {
            this.instaBarChartData["trust"] += 1;
          }

        }
        this.instaBarData = Object.values(this.instaBarChartData);
        this.twitterBarData = Object.values(this.twitterBarChartData);
        this.barTitles = Object.keys(this.twitterBarChartData);
        this.mapDataSet = true;
      },
      (error) => {
        // console.log(error);
      }
    );
  }
}
