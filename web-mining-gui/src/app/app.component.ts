/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { HttpClient } from '@angular/common/http';
import { RetrieveDataService } from './@theme/components/charts/retrieveData.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService,private httpClient: HttpClient, private retrieveDataService: RetrieveDataService) {
  }

  ngOnInit(): void {
    const url = "http://localhost:9000/web-mining/rest/api/v1/retrieve_data";
    this.httpClient.get(url).subscribe(
      (data) => {
        this.retrieveDataService.chartData = data;
        this.retrieveDataService.chartDataEmmitter.next(data);
      }
    )
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
