import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { ShowUserComponent } from './show-user/show-user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: "users-list",
        component: ShowUserComponent,
      },
      {
        path: "delete-user",
        component: DeleteUserComponent,
      },
      {
        path: "create-user",
        component: CreateUserComponent,
      },
      {
        path: "edit-user",
        component: EditUserComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
