import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users-table/users-table.component'
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../shared/services/admin.service';
import { BsModalService } from "ngx-bootstrap/modal";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    UsersTableComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule

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
