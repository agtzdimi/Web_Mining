import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { UserProfilingComponent } from './user-profiling/user-profiling.component';
import { GisComponent } from './gis/gis.component';
import { EmotionComponent } from './emotion/emotion.component';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'miscellaneous',
        loadChildren: () =>
          import('./miscellaneous/miscellaneous.module').then(
            m => m.MiscellaneousModule,
          ),
      },
      {
        path: 'general',
        component:GeneralComponent,
      },
      {
        path: 'emotion',
        component: EmotionComponent,
      },
      {
        path: 'gis',
        component: GisComponent,
      },
      {
        path: 'user-profiling',
        component: UserProfilingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
