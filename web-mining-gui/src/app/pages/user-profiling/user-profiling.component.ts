import { Component } from "@angular/core";
import { RetrieveDataService } from '../../@theme/components/charts/retrieveData.service';

@Component({
  selector: "ngx-user-profiling",
  templateUrl: "./user-profiling.component.html",
  styleUrls: ["./user-profiling.component.scss"],
})
export class UserProfilingComponent {
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

  constructor(private retrieveDataService: RetrieveDataService) {
    if(this.retrieveDataService.chartData) {
      this.onDataloaded();
    }
    this.retrieveDataService.chartDataEmmitter.subscribe(
      (data) => {
        this.onDataloaded();
      }
    )
  }

  onDataloaded() {

        this.data = this.retrieveDataService.chartData;
        for (let i = 0; i < this.data["tweets"].length; i++) {
          // Age Group Calculation
          if (this.data["tweets"][i]["age_group"] === "Young") {
            this.userProfileObj["totalYoung"]++;
            if (this.data["tweets"][i]["hate_speech"] === "1") {
              this.userProfileObj["totalYoungNotHate"]++;
            } else {
              this.userProfileObj["totalYoungHate"]++;
            }
          } else if (this.data["tweets"][i]["age_group"] === "Middle_aged") {
            this.userProfileObj["totalMiddleAged"]++;
            if (this.data["tweets"][i]["hate_speech"] === "1") {
              this.userProfileObj["totalMiddleAgedNotHate"]++;
            } else {
              this.userProfileObj["totalMiddleAgedHate"]++;
            }
          } else if (this.data["tweets"][i]["age_group"] === "Elder") {
            this.userProfileObj["totalElder"]++;
            if (this.data["tweets"][i]["hate_speech"] === "1") {
              this.userProfileObj["totalElderNotHate"]++;
            } else {
              this.userProfileObj["totalElderHate"]++;
            }
          }

          // Gender Calculation
          if (this.data["tweets"][i]["gender"] === "Male") {
            this.userProfileObj["totalMale"]++;
            if (this.data["tweets"][i]["hate_speech"] === "1") {
              this.userProfileObj["totalMaleNotHate"]++;
            } else {
              this.userProfileObj["totalMaleHate"]++;
            }
          } else if (this.data["tweets"][i]["gender"] === "Female") {
            this.userProfileObj["totalFemale"]++;
            if (this.data["tweets"][i]["hate_speech"] === "1") {
              this.userProfileObj["totalFemaleNotHate"]++;
            } else {
              this.userProfileObj["totalFemaleHate"]++;
            }
          } else if (this.data["tweets"][i]["gender"] === "nan") {
            this.userProfileObj["totalNonRecognized"]++;
            if (this.data["tweets"][i]["hate_speech"] === "1") {
              this.userProfileObj["totalNonRecognizedNotHate"]++;
            } else {
              this.userProfileObj["totalNonRecognizedHate"]++;
            }
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
        this.mapDataSet = true;
  }
}
