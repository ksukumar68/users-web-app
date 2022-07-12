import { Component, OnInit } from '@angular/core';
import { Column } from '../../shared/interface/table-column';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent<T> implements OnInit {
  tableData: any ;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUsersList().subscribe((response=>{
      console.log(response)
      if(response.status){
        this.tableData =  response.data;
        this.tableData.forEach((data: { action: string})=>{
          data.action = 'View';
        })
      }
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
