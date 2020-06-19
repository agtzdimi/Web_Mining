import { Component } from "@angular/core";
import { GridCoordinatesService } from "../../@theme/components/charts/gridCoordinates.service";
import { RetrieveDataService } from '../../@theme/components/charts/retrieveData.service';

@Component({
  selector: "ngx-gis",
  templateUrl: "./gis.component.html",
  styleUrls: ["./gis.component.scss"],
  providers: [GridCoordinatesService]
})
export class GisComponent {
  dates = [];
  data: any;
  mapDataSet: boolean = false;
  lineDates = {};

  constructor(
    private retrieveDataService: RetrieveDataService,
    private gridService: GridCoordinatesService
  ) {
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
          // Posts Per Date Calculation
          if (this.lineDates[this.data["tweets"][i]["timestamp"]]) {
            this.lineDates[this.data["tweets"][i]["timestamp"]] += 1;
          } else {
            this.lineDates[this.data["tweets"][i]["timestamp"]] = 1;
          }
        }

        this.dates = Object.keys(this.lineDates);
        this.gridService.setCordinates(this.data["tweets"]);
        this.mapDataSet = true;
  }
}
