import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GridCoordinatesService } from "../../@theme/components/charts/gridCoordinates.service";

@Component({
  selector: "ngx-gis",
  templateUrl: "./gis.component.html",
  styleUrls: ["./gis.component.scss"],
})
export class GisComponent implements OnInit {
  dates = [];
  data: any;
  mapDataSet: boolean = false;
  lineDates = {};

  constructor(
    private httpClient: HttpClient,
    private gridService: GridCoordinatesService
  ) {}

  ngOnInit() {
    const url = "http://localhost:9000/web-mining/rest/api/v1/retrieve_data";
    this.httpClient.get(url).subscribe(
      (data) => {
        this.data = data;
        for (let i = 0; i < data["tweets"].length; i++) {
          // Posts Per Date Calculation
          if (this.lineDates[data["tweets"][i]["timestamp"]]) {
            this.lineDates[data["tweets"][i]["timestamp"]] += 1;
          } else {
            this.lineDates[data["tweets"][i]["timestamp"]] = 1;
          }
        }

        this.dates = Object.keys(this.lineDates);
        this.gridService.setCordinates(data["tweets"]);
        this.mapDataSet = true;
      },
      (error) => {
        // console.log(error);
      }
    );
  }
}
