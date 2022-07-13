import { Component, OnInit, Input, OnChanges, SimpleChange, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from '../interface/table-column';
import { UserData } from '../interface/user-data.interface';
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { NgForm } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, OnChanges {
  @Input()
  tableColumns: Array<Column> = [];

  @Input()
  tableData: Array<UserData> = [];

  displayedColumns: Array<string> = [];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource();
  editUserId: string = '';
  userName: string = '';
  userEmail: string = '';
  userDOB: string = '';
  userAction: string = '';
  modalRef: any;
  constructor(
    private modalService: BsModalService,
    private adminService:AdminService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  onSubmit(data: NgForm){
    var finalData: UserData = {
      name: data.controls['userName'].value,
      email: data.controls['userEmail'].value,
      dob: data.controls['userDOB'].value
    }
    switch(this.userAction) {
      case "Edit":
        this.adminService.updateUser(this.editUserId, finalData).subscribe(response=>{
          if(response.status){
            response.data.action = "Edit";
            const index = this.tableData.findIndex((userData: UserData)=> userData._id == this.editUserId);
            this.tableData[index] = response.data;
            this.dataSource = new MatTableDataSource(this.tableData);
            this.openSnackBar("Successfully updated");
          } else{
            this.openSnackBar("Something went wrong");
          }
        })
        break;
      case "Add":
        this.adminService.addUser(finalData).subscribe(response=>{
          if(response.status){
            response.data.action = "Add";
            this.tableData.push(response.data)
            this.dataSource = new MatTableDataSource(this.tableData);
            this.openSnackBar("Successfully added");
          } else{
            this.openSnackBar("Something went wrong");
          }
        })
        break;    

    }
    this.modalRef.hide();
  }

  ngOnChanges(){
    this.dataSource = new MatTableDataSource(this.tableData);
  }

   openEditModal(template: TemplateRef<any>, data: any, index: number){
    switch(data.action) {
      case "Delete":
        this.userAction = data.action;
        this.adminService.deleteUser(data._id).subscribe(async response=>{
          if(response){
            this.tableData.splice(index, 1)
            this.dataSource = new MatTableDataSource(this.tableData);
            this.openSnackBar("Successfully deleted");
          }
        })
        break;
      case "Edit":
        this.userName = data.name;
        this.userEmail = data.email;
        this.userDOB = data.dob;
        this.editUserId = data._id;
        this.userAction = data.action;
        this.modalRef =this.modalService.show(template);
        break;
      case "View":
        this.userName = data.name;
        this.userEmail = data.email;
        this.userDOB = data.dob;
        this.editUserId = data._id;
        this.userAction = data.action;
        this.modalRef =this.modalService.show(template);
        break; 
      case "Add":
        this.userName = "";
        this.userEmail = "";
        this.userDOB = "";
        this.editUserId = "";
        this.userAction = "Add";
        this.modalRef = this.modalService.show(template);
        break;    

    }

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Ok");
  }

 

}
