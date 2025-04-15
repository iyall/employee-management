import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3001/employee';
  constructor(private httpClient: HttpClient) { }


  getEmployee(){
    return this.httpClient.get<any[]>(this.apiUrl);
  }
  create = (createdData: any) => this.httpClient.post<any>(`${this.apiUrl}`, createdData);
  get = (userId: number) => this.httpClient.get<any>(`${this.apiUrl}/${userId}`);
  update = (updateData: any, userId: number) => this.httpClient.put<any>(`${this.apiUrl}/${userId}`, updateData);
  delete= (id: number) => this.httpClient.delete(`${this.apiUrl}/${id}`);
}
