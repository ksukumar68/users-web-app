import { Component, OnInit } from '@angular/core';
import { Column } from '../../shared/interface/table-column';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  tableData: any ;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUsersList().subscribe((response=>{
      console.log(response)
      this.tableData =  response;
      this.tableData.forEach((data: { action: string})=>{
        data.action = 'Add';
      })
      console.log(this.tableData)
    }))
  }

  tableColumns: Array<Column> = [
    {
      columnDef: 'name',
      header: 'name',
      cell: (element: Record<string, any>) => `${element['name']}`
    },
    {
      columnDef: 'email',
      header: 'email',
      cell: (element: Record<string, any>) => `${element['email']}`,
    },
    {
      columnDef: 'dob',
      header: 'dob',
      cell: (element: Record<string, any>) => `${element['dob']}`
    },
    {
      columnDef: 'action',
      header: 'action',
      cell: (element: Record<string, any>) => `${element['action']}`,
      isButton: true,
    }
  ];

}
