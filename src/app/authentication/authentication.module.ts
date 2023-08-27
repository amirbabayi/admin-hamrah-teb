import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationRoutingModule} from "./authentication-routing.module";
import {Page500Component} from "./page500/page500.component";
import {Page404Component} from "./page404/page404.component";
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {LockedComponent} from "./locked/locked.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {InlineSVGModule} from "ng-inline-svg-2";

@NgModule({
  declarations: [
    Page500Component,
    Page404Component,
    SigninComponent,
    SignupComponent,
    LockedComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    InlineSVGModule,
  ],
})
export class AuthenticationModule {
}