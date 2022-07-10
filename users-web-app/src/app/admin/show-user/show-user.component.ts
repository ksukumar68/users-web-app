import { Component, OnInit } from '@angular/core';
import { Column } from '../../shared/interface/table-column'

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
      columnDef: 'DOB',
      header: 'DOB',
      cell: (element: Record<string, any>) => `${element['DOB']}`
    },
    {
      columnDef: 'action',
      header: 'action',
      cell: (element: Record<string, any>) => `${element['action']}`,
      isButton: true,
    }
  ];

  tableData = [

  ];

}
