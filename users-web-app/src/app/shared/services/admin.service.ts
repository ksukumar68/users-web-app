import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserData } from '../interface/user-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getAllUsersList() {
    return this.http.get('/getUser').pipe(map((response: any) => response));;
  }

  deleteUser(userId: string) {
    return this.http.delete('/deleteUser/'+ userId).pipe(map((response: any) => response));;
  }

  updateUser(userId: string, updatedData: UserData) {
    return this.http.patch('/updateUser/'+ userId, updatedData).pipe(map((response: any) => response));;
  }

  addUser(updatedData: UserData) {
    return this.http.post('/addUser', updatedData).pipe(map((response: any) => response));;
  }
}
