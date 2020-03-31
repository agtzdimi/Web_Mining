import { Component } from "@angular/core";

@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  lineChart = [1, 2, 3, 5, 4, 6, 6, 4, 6, 1, 2, 3, 2, 5, 6];
  pieSeriesData = [
    { name: "Test1", value: 12 },
    { name: "Test2", value: 20 },
    { name: "Test3", value: 14 }
  ];
  barChartData = [12, 20, 14];
  barChartTitles = ["Test1", "Test2", "Test3"];
}
