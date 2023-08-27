import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DutiesComponent } from "./duties.component";

const routes: Routes = [
  {
    path: "",
    component: DutiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DutiesRoutingModule {}
