import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GridCoordinatesService } from "../../@theme/components/charts/gridCoordinates.service";

@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  lineChart = [1, 2, 3, 5, 4, 6, 6, 4, 6, 1, 2, 3, 2, 5, 6];
  postsPerCountry = [];
  countriesLineData = [];
  postPerDate = [];
  dates = [];
  lineDates = {};
  countryPosts = {};
  pieSeriesData = [];
  countries = [];
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
    totalNonRecognized: 0,
    totalNonRecognizedNotHate: 0,
    totalNonRecognizedHate: 0,
  };
  data: any;
  ageBars: (string | number)[][];
  genderBars: (string | number)[][];
  mapDataSet: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private gridService: GridCoordinatesService
  ) {}

  ngOnInit() {
    const url = "http://localhost:9000/web-mining/rest/api/v1/retrieve_data";
    this.httpClient.get(url).subscribe(
      (data) => {
        console.log(data);
        this.data = data;
        for (let i = 0; i < data["tweets"].length; i++) {
          // Age Group Calculation
          if (data["tweets"][i]["age_group"] === "Young") {
            this.userProfileObj["totalYoung"]++;
            if (data["tweets"][i]["hate_speech"] === "0") {
              this.userProfileObj["totalYoungNotHate"]++;
            } else {
              this.userProfileObj["totalYoungHate"]++;
            }
          } else if (data["tweets"][i]["age_group"] === "Middle_aged") {
            this.userProfileObj["totalMiddleAged"]++;
            if (data["tweets"][i]["hate_speech"] === "0") {
              this.userProfileObj["totalMiddleAgedNotHate"]++;
            } else {
              this.userProfileObj["totalMiddleAgedHate"]++;
            }
          } else if (data["tweets"][i]["age_group"] === "Elder") {
            this.userProfileObj["totalElder"]++;
            if (data["tweets"][i]["hate_speech"] === "0") {
              this.userProfileObj["totalElderNotHate"]++;
            } else {
              this.userProfileObj["totalElderHate"]++;
            }
          }

          // Gender Calculation
          if (data["tweets"][i]["gender"] === "Male") {
            this.userProfileObj["totalMale"]++;
            if (data["tweets"][i]["hate_speech"] === "0") {
              this.userProfileObj["totalMaleNotHate"]++;
            } else {
              this.userProfileObj["totalMaleHate"]++;
            }
          } else if (data["tweets"][i]["gender"] === "Female") {
            this.userProfileObj["totalFemale"]++;
            if (data["tweets"][i]["hate_speech"] === "0") {
              this.userProfileObj["totalFemaleNotHate"]++;
            } else {
              this.userProfileObj["totalFemaleHate"]++;
            }
          } else if (data["tweets"][i]["gender"] === "nan") {
            this.userProfileObj["totalNonRecognized"]++;
            if (data["tweets"][i]["hate_speech"] === "0") {
              this.userProfileObj["totalNonRecognizedNotHate"]++;
            } else {
              this.userProfileObj["totalNonRecognizedHate"]++;
            }
          }

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

          // Countries Calculation
          if (
            !this.countries.includes(data["tweets"][i]["location"]) &&
            data["tweets"][i]["location"]
          ) {
            this.countries.push(data["tweets"][i]["location"]);
          }

          // Posts Per Country Calculation

          if (
            this.countryPosts[data["tweets"][i]["location"]] &&
            data["tweets"][i]["location"]
          ) {
            this.countryPosts[data["tweets"][i]["location"]] += 1;
          } else if (data["tweets"][i]["location"]) {
            this.countryPosts[data["tweets"][i]["location"]] = 1;
          }

          // Posts Per Date Calculation
          if (this.lineDates[data["tweets"][i]["timestamp"]]) {
            this.lineDates[data["tweets"][i]["timestamp"]] += 1;
          } else {
            this.lineDates[data["tweets"][i]["timestamp"]] = 1;
          }
        }

        this.ageBars = [
          ["age", "Total", "Hate Speech", "Neutral"],
          [
            "Young",
            this.userProfileObj["totalYoung"],
            this.userProfileObj["totalYoungHate"],
            this.userProfileObj["totalYoungNotHate"],
          ],
          [
            "Middle Aged",
            this.userProfileObj["totalMiddleAged"],
            this.userProfileObj["totalMiddleAgedHate"],
            this.userProfileObj["totalMiddleAgedNotHate"],
          ],
          [
            "Elder",
            this.userProfileObj["totalElder"],
            this.userProfileObj["totalElderHate"],
            this.userProfileObj["totalElderNotHate"],
          ],
        ];
        this.genderBars = [
          ["gender", "Total", "Hate Speech", "Neutral"],
          [
            "Male",
            this.userProfileObj["totalMale"],
            this.userProfileObj["totalMaleHate"],
            this.userProfileObj["totalMaleNotHate"],
          ],
          [
            "Female",
            this.userProfileObj["totalFemale"],
            this.userProfileObj["totalFemaleHate"],
            this.userProfileObj["totalFemaleNotHate"],
          ],
          [
            "Not Recognized",
            this.userProfileObj["totalNonRecognized"],
            this.userProfileObj["totalNonRecognizedHate"],
            this.userProfileObj["totalNonRecognizedNotHate"],
          ],
        ];
        this.countriesLineData = Object.values(this.countryPosts);
        this.postsPerCountry = Object.keys(this.countryPosts);
        this.postPerDate = Object.values(this.lineDates);
        this.dates = Object.keys(this.lineDates);
        this.gridService.setCordinates(data["tweets"]);
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
