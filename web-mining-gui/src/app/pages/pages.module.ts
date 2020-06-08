import { NgModule } from "@angular/core";
import {
  NbMenuModule,
  NbCardModule,
  NbIconComponent,
  NbIconModule,
} from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { FormsModule } from "@angular/forms";
import { PagesRoutingModule } from "./pages-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    FormsModule,
    NbMenuModule,
    NbIconModule,
    NbCardModule,
  ],
  declarations: [PagesComponent, DashboardComponent],
})
export class PagesModule {}
