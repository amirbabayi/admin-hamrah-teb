import {NgModule} from "@angular/core";
import {AppsRoutingModule} from "./apps-routing.module";
import {CommonModule} from "@angular/common";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InlineSVGModule} from "ng-inline-svg-2";
import {TooltipModule} from "primeng/tooltip";
import {SearchInputComponent} from "../shared/components/search-input/search-input.component";
import {PaginatorModule} from "primeng/paginator";
import {UsersComponent} from './users/users.component';
import {MultiSelectModule} from "primeng/multiselect";
import {SharedModule} from "../shared/shared.module";
import {ServicesComponent} from './services/services.component';
import {ComponentsModule} from "../shared/components/components.module";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {EditorModule} from "primeng/editor";
import {BlogsModule} from "./blogs/blogs.module";
import {DutiesModule} from "./duties/duties.module";

@NgModule({
  declarations: [
    SearchInputComponent,
    UsersComponent,
    ServicesComponent,
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    TooltipModule,
    PaginatorModule,
    MultiSelectModule,
    SharedModule,
    ComponentsModule,
    ButtonModule,
    RippleModule,
    ConfirmPopupModule,
    BlogsModule,
    DutiesModule,
    EditorModule
  ],
})

export class AppsModule {
}
