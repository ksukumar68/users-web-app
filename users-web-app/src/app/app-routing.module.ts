import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module'

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/dashboard/users-list",
  },
  { path: '', loadChildren: () => AdminModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
