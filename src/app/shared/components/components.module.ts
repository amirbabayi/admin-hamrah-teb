import {NgModule} from "@angular/core";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {SharedModule} from "../shared.module";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AutoCompleteComponent} from './auto-complete/auto-complete.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {InlineSVGModule} from "ng-inline-svg-2";

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, AutoCompleteComponent],
  imports: [SharedModule, ProgressSpinnerModule, AutoCompleteModule, InlineSVGModule],
  exports: [FileUploadComponent, BreadcrumbComponent, AutoCompleteComponent],
})
export class ComponentsModule {
}
