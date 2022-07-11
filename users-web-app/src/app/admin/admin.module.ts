import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { SharedModule } from '../shared/shared.module'
import {MatTableModule} from '@angular/material/table';
import { AdminService } from '../shared/services/admin.service'

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ShowUserComponent,
    CreateUserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatTableModule
  ],
  providers: [
    AdminService
  ],
})
export class AdminModule { }
