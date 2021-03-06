import { Component } from "@angular/core";
import { RetrieveDataService } from "../../@theme/components/charts/retrieveData.service";

@Component({
  selector: "ngx-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.scss"]
})
export class GeneralComponent {
  postsPerCountry = [];
  countriesLineData = [];
  postPerDate = [];
  dates = [];
  lineDates = {};
  countryPosts = {};
  countries = [];
  data: any;
  mapDataSet: boolean = false;

  constructor(private retrieveDataService: RetrieveDataService) {
    if (this.retrieveDataService.chartData) {
      this.onDataloaded();
    }
    this.retrieveDataService.chartDataEmmitter.subscribe(data => {
      this.onDataloaded();
    });
  }

  onDataloaded() {
    this.data = this.retrieveDataService.chartData;
    for (let i = 0; i < this.data["tweets"].length; i++) {
      // Countries Calculation
      if (
        !this.countries.includes(this.data["tweets"][i]["location"]) &&
        this.data["tweets"][i]["location"]
      ) {
        this.countries.push(this.data["tweets"][i]["location"]);
      }

      // Posts Per Country Calculation

      if (
        this.countryPosts[this.data["tweets"][i]["location"]] &&
        this.data["tweets"][i]["location"]
      ) {
        this.countryPosts[this.data["tweets"][i]["location"]] += 1;
      } else if (this.data["tweets"][i]["location"]) {
        this.countryPosts[this.data["tweets"][i]["location"]] = 1;
      }

      // Posts Per Date Calculation
      if (this.lineDates[this.data["tweets"][i]["timestamp"]]) {
        this.lineDates[this.data["tweets"][i]["timestamp"]] += 1;
      } else {
        this.lineDates[this.data["tweets"][i]["timestamp"]] = 1;
      }
    }

    const tempArr = this.sortByKey(this.countryPosts);
    const tempObj = {};
    for (let i = 0; i < tempArr.length; i++) {
      tempObj[tempArr[i][0]] = tempArr[i][1];
    }
    this.countryPosts = tempObj;
    this.countriesLineData = Object.values(this.countryPosts);
    this.postsPerCountry = Object.keys(this.countryPosts);
    this.postPerDate = Object.values(this.lineDates);
    this.dates = Object.keys(this.lineDates);
    this.mapDataSet = true;
  }

  sortByKey(jsObj) {
    let sortedArray = [];

    // Push each JSON Object entry in array by [key, value]
    for (let i in jsObj) {
      sortedArray.push([i, jsObj[i]]);
    }

    // Run native sort function and returns sorted array.
    return sortedArray.sort((a, b) => {
      if (a[1] > b[1]) {
        return -1;
      }
      if (a[1] < b[1]) {
        return 1;
      }
      return 0;
    });
  }
}
