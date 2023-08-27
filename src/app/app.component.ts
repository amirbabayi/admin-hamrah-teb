import {AfterViewInit, Component, Inject, Renderer2} from '@angular/core';
import {Event, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {InConfiguration} from "./core/models/config.interface";
import {DOCUMENT} from "@angular/common";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AppComponent implements AfterViewInit {
  currentUrl!: string;
  selectedBgColor = 'white';
  isDarkSidebar = false;
  isDarTheme = false;
  public innerHeight?: number;
  headerHeight = 60;
  isRtl = false;
  public config!: InConfiguration;

  constructor(public _router: Router,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2,
  ) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }
      if (routerEvent instanceof NavigationEnd) {
        /* empty */
      }
      window.scrollTo(0, 0);
    });
  }

  ngAfterViewInit() {
    if (localStorage.getItem('isRtl')) {
      if (localStorage.getItem('isRtl') === 'true') {
        this.setRTLSettings();
      } else if (localStorage.getItem('isRtl') === 'false') {
        this.setLTRSettings();
      }
    } else {
      if (this.config?.layout?.rtl) {
        this.setRTLSettings();
      } else {
        this.setLTRSettings();
      }
    }
  }


  setRTLSettings() {
    document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    this.renderer.addClass(this.document.body, 'rtl');
    this.isRtl = true;
    localStorage.setItem('isRtl', 'true');
  }

  setLTRSettings() {
    document.getElementsByTagName('html')[0].removeAttribute('dir');
    this.renderer.removeClass(this.document.body, 'rtl');
    this.isRtl = false;
    localStorage.setItem('isRtl', 'false');
  }
}
