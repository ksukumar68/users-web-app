import { Component, OnInit, Input, OnChanges, SimpleChange, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from '../interface/table-column';
import { UserData } from '../interface/user-data.interface';
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { NgForm } from '@angular/forms';
import { AdminService } from '../../shared/services/admin.service';

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
  editUserId: any;
  userName: string = '';
  userEmail: string = '';
  userDOB: string = '';
  userAction: string = '';
  // modalRef: BsModalRef = {};
  constructor(
    private modalService: BsModalService,
    private adminService:AdminService) { }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
    console.log(this.tableData)
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  onSubmit(data: NgForm){
    console.log(data.controls['userEmail'].value);
    var finalData: UserData = {
      name: data.controls['userName'].value,
      email: data.controls['userEmail'].value,
      dob: data.controls['userDOB'].value
    }
    console.log(this.userAction)
    switch(this.userAction) {
      case "Edit":
        this.adminService.updateUser(this.editUserId, finalData).subscribe(response=>{
          console.log(response)
          if(response.status){
            response.data.action = "Edit";
            this.tableData.filter((userData: UserData)=> userData._id != this.editUserId);
            this.tableData.push(response.data)
            this.dataSource = new MatTableDataSource(this.tableData);
          }
        })
        break;
      case "Add":
        this.adminService.addUser(finalData).subscribe(response=>{
          console.log(response)
          if(response.status){
            response.data.action = "Add";
            this.tableData.push(response.data)
            this.dataSource = new MatTableDataSource(this.tableData);
            console.log(response)
            console.log(this.tableData)
          }
        })
        break;    

    }
  }

  ngOnChanges(){
    console.log(this.tableData)
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  openEditModal(template: TemplateRef<any>, data: any){
    switch(data.action) {
      case "Delete":
        this.userAction = data.action;
        this.adminService.deleteUser(data._id).subscribe(response=>{
          console.log(response)
          if(data.acknowledged){
            this.tableData.filter((userData: UserData)=> userData._id != data._id)
          }
        })
        break;
      case "Edit":
        this.userName = data.name;
        this.userEmail = data.email;
        this.userDOB = data.dob;
        this.editUserId = data._id;
        this.userAction = data.action;
        this.modalService.show(template);
        break;
      case "View":
        this.userName = data.name;
        this.userEmail = data.email;
        this.userDOB = data.dob;
        this.editUserId = data._id;
        this.userAction = data.action;
        this.modalService.show(template);
        break; 
      case "Add":
        this.userName = "";
        this.userEmail = "";
        this.userDOB = "";
        this.editUserId = "";
        this.userAction = "Add";
        this.modalService.show(template);
        break;    

    }

    // if(data.action == "Delete"){
    //   console.log("delete")
    //   this.adminService
    //   return;
    // } else if(data.action == "Edit" || data.action == "View"){
    //   this.userName = data.name;
    //   this.userEmail = data.email;
    //   this.userDOB = data.dob;
    //   this.editUserId = data._id;
    // } else if( data.action == "Add"){
    //     this.userName = "";
    //     this.userEmail = "";
    //     this.userDOB = "";
    //     this.editUserId = "";
    // }
    // console.log(data)
    // this.userAction = data.action;
    // this.modalService.show(template);
  }

 

}
