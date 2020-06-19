import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class RetrieveDataService {
  public chartData;
  chartDataEmmitter = new Subject<Object>();
}
