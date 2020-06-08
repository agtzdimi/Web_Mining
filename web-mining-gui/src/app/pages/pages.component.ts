import { Component } from '@angular/core';

import { NbIconLibraries } from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('fas', {
      iconClassPrefix: 'fas',
      packClass: 'fas',
    });
    this.iconLibraries.registerFontPack('fa', {
      iconClassPrefix: 'fa',
      packClass: 'fa',
    });
    this.iconLibraries.registerFontPack('fab', {
      iconClassPrefix: 'fa',
      packClass: 'fab',
    });
  }

  menu = MENU_ITEMS;
}
