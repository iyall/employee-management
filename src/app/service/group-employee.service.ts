import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupEmployeeService {

  private apiUrl = 'http://localhost:3000/group';
  constructor(private httpClient: HttpClient) { }


  getGroup(){
    return this.httpClient.get<any[]>(this.apiUrl);
  }
  create = (createdData: any) => this.httpClient.post<any>(`${this.apiUrl}`, createdData);
  get = (userId: number) => this.httpClient.get<any>(`${this.apiUrl}/${userId}`);
  update = (updateData: any, userId: number) => this.httpClient.put<any>(`${this.apiUrl}/${userId}`, updateData);
  delete= (id: number) => this.httpClient.delete(`${this.apiUrl}/${id}`);
}
