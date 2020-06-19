import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GridCoordinatesService } from "../../@theme/components/charts/gridCoordinates.service";

@Component({
  selector: "ngx-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.scss"],
})
export class GeneralComponent implements OnInit {
  postsPerCountry = [];
  countriesLineData = [];
  postPerDate = [];
  dates = [];
  lineDates = {};
  countryPosts = {};
  countries = [];
  data: any;
  mapDataSet: boolean = false;

  constructor(
    private httpClient: HttpClient) {}

  ngOnInit() {
    const url = "http://localhost:9000/web-mining/rest/api/v1/retrieve_data";
    this.httpClient.get(url).subscribe(
      (data) => {
        this.data = data;
        for (let i = 0; i < data["tweets"].length; i++) {

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

        this.countriesLineData = Object.values(this.countryPosts);
        this.postsPerCountry = Object.keys(this.countryPosts);
        this.postPerDate = Object.values(this.lineDates);
        this.dates = Object.keys(this.lineDates);
        this.mapDataSet = true;
      },
      (error) => {
        // console.log(error);
      }
    );
  }
}
