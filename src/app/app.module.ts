import {NgModule} from "@angular/core";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./layout/header/header.component";
import {PageLoaderComponent} from "./layout/page-loader/page-loader.component";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {AuthLayoutComponent} from "./layout/app-layout/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./layout/app-layout/main-layout/main-layout.component";
import {fakeBackendProvider} from "./core/interceptor/fake-backend";
import {ErrorInterceptor} from "./core/interceptor/error.interceptor";
import {JwtInterceptor} from "./core/interceptor/jwt.interceptor";
import {DecimalPipe} from "@angular/common";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule,} from "@angular/common/http";
import {LoadingBarRouterModule} from "@ngx-loading-bar/router";
import {ToastModule} from "primeng/toast";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InlineSVGModule} from "ng-inline-svg-2";
import {SidebarModule} from "primeng/sidebar";
import {DialogModule} from "primeng/dialog";
import {TooltipModule} from "primeng/tooltip";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarRouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    // core & shared
    CoreModule,
    SharedModule,
    ToastModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    InlineSVGModule,
    SidebarModule,
    DialogModule,
    TooltipModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    fakeBackendProvider,
    DecimalPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
