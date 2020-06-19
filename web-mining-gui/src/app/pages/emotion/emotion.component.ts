import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "ngx-emotion",
  templateUrl: "./emotion.component.html",
  styleUrls: ["./emotion.component.scss"],
})
export class EmotionComponent implements OnInit {
  pieSeriesData = [];
  barChartData = {
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
  barData = [];
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
            this.pieSeriesData.push({ sentiment: "Neutral" });
          } else if (data["tweets"][i]["sentiment"]["pred"] === "positive") {
            this.pieSeriesData.push({ sentiment: "Positive" });
          } else {
            this.pieSeriesData.push({ sentiment: "Negative" });
          }

          // Emotion Calculation
          if (data["tweets"][i]["emotion"]["pred"].includes("joy")) {
            this.barChartData["joy"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("anger")) {
            this.barChartData["anger"] += 1;
          } else if (
            data["tweets"][i]["emotion"]["pred"].includes("anticipation")
          ) {
            this.barChartData["anticipation"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("disgust")) {
            this.barChartData["disgust"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("fear")) {
            this.barChartData["fear"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("love")) {
            this.barChartData["love"] += 1;
          } else if (
            data["tweets"][i]["emotion"]["pred"].includes("optimism")
          ) {
            this.barChartData["optimism"] += 1;
          } else if (
            data["tweets"][i]["emotion"]["pred"].includes("pessimism")
          ) {
            this.barChartData["pessimism"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("sadness")) {
            this.barChartData["sadness"] += 1;
          } else if (
            data["tweets"][i]["emotion"]["pred"].includes("surprise")
          ) {
            this.barChartData["surprise"] += 1;
          } else if (data["tweets"][i]["emotion"]["pred"].includes("trust")) {
            this.barChartData["trust"] += 1;
          }

        }
        this.barData = Object.values(this.barChartData);
        this.barTitles = Object.keys(this.barChartData);
        this.mapDataSet = true;
      },
      (error) => {
        // console.log(error);
      }
    );
  }
}
