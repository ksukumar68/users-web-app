import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users-table/users-table.component'
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../shared/services/admin.service';
import { BsModalService } from "ngx-bootstrap/modal";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    UsersTableComponent
  ],
  providers: [
    AdminService,
    BsModalService
  ],
})
export class SharedModule { }
