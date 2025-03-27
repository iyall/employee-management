import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, GroupEmployeeService } from '../service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent {
  employee = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    birthdate: '',
    basicsalary: 0,
    status: 'Active',
    group: '',
    description: '',
  };
  today = new Date();
  optionCurrency = {
    prefix: 'Rp. ',
    thousands: '.',
    align: 'left',
    precision: 0,
    allowNegative: false,
  };

  items = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private employeeService: EmployeeService,
    private groupService: GroupEmployeeService
  ) {
    this.getGroup();
  }

  createEmployee(): void {
    this.employeeService.create(this.employee).subscribe((res) => {
      Swal.fire({
        text: 'Sukses Menambahkan Data',
        icon: 'success',
      }).then(() => {
        this.employee = {
          username: '',
          firstname: '',
          lastname: '',
          email: '',
          birthdate: '',
          basicsalary: 0,
          status: 'Active',
          group: '',
          description: '',
        };
      });
    });
  }
  onBack() {
    this.router.navigate(['/employee-list']);
  }
  getGroup() {
    this.groupService.getGroup().subscribe((res: any) => {
      this.items = res;
    });
  }
}
