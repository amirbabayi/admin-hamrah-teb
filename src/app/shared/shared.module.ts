import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AddressComponent} from "./components/address/address.component";
import {DropdownModule} from "primeng/dropdown";
import {DropdownComponent} from "./components/dropdown/dropdown.component";
import {JalaliPipe} from "../core/pipes/jalali.pipe";
import {FeatherIconsModule} from "./components/feather-icons/feather-icons.module";

@NgModule({
  declarations: [SpinnerComponent, AddressComponent, DropdownComponent, JalaliPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ProgressSpinnerModule, DropdownModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SpinnerComponent,
    DropdownComponent,
    AddressComponent,
    FeatherIconsModule,
    JalaliPipe
  ],
})
export class SharedModule {
}
