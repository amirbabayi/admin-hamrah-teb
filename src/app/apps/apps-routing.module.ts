import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'blogs',
    pathMatch: 'full'
  },
  {
    path: 'blogs',
    loadChildren: () => import('../apps/blogs/blogs-routing.module').then((m) => m.BlogsRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'duties',
    loadChildren: () => import('../apps/duties/duties-routing.module').then((m) => m.DutiesRoutingModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'services',
  //   component: ServicesComponent,
  //   canActivate: [AdminGuard]
  //
  // },
  // {
  //   path: 'users',
  //   component: UsersComponent,
  //   canActivate: [AdminGuard]
  //
  // },
  // {
  //   path: 'orders',
  //   component: OrdersComponent,
  //   canActivate: [AdminOperatorGuard]
  //
  // },
  // {
  //   path: 'un-assign-orders',
  //   component: UnAssignOrderComponent,
  //   // canActivate: [AdminOperatorGuard]
  // },
  // {
  //   path: 'my-orders',
  //   component: MyOrdersComponent,
  //   // canActivate: [AdminOperatorGuard]
  // },
  // {
  //   path: 'employee',
  //   component: EmployeeComponent,
  //   canActivate: [AdminGuard]
  //
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppsRoutingModule {
}
