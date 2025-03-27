import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {EmployeeService, GroupEmployeeService} from '../service'

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  employee: any = {};
  backPage: string = '';
  items = []
  today = new Date()
  optionCurrency={ 
    prefix: 'Rp. ', 
    thousands: '.', 
    align :'left',
    precision :0,
    allowNegative :false
  };
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private employeeService: EmployeeService,
    private groupService: GroupEmployeeService

  ) {}

  ngOnInit(): void {
    this.getGroup()
    const navigation = window.history.state;

    if (navigation && navigation.data) {
      this.employee = navigation.data;
      this.backPage=navigation.backPage

      console.log("navigation.data : ", navigation.data)
    }
  }

  updateEmployee(): void {
    this.employeeService.update(this.employee, this.employee.id).subscribe((res)=>{
      console.log(res)

      this.router.navigate(['/employee-list']);

    })
  }
  onBack(){
    this.router.navigate(['/employee-list'])
  }
  getGroup(){
    this.groupService.getGroup().subscribe((res:any)=>{
      this.items=res
    })
  }
  onSelect(val:any){
    console.log(val)
  }
}
