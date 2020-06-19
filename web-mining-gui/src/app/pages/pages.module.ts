import { NgModule } from '@angular/core';
import {
  NbMenuModule,
  NbCardModule,
  NbIconModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { GeneralComponent } from './general/general.component';
import { EmotionComponent } from './emotion/emotion.component';
import { GisComponent } from './gis/gis.component';
import { UserProfilingComponent } from './user-profiling/user-profiling.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    FormsModule,
    NbMenuModule,
    NbIconModule,
    NbCardModule,
    NbSpinnerModule
  ],
  declarations: [PagesComponent, GeneralComponent, EmotionComponent, GisComponent, UserProfilingComponent],
})
export class PagesModule {}
