import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeService } from '../service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    'username',
    'firstname',
    'lastname',
    'email',
    // 'birthdate',
    // 'basicsalary',
    'status',
    // 'group',
    // 'description',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();
  filter: any = { username: '', email: '' };
  isLoading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const navigation = window.history.state;

    if (navigation && navigation.filter) {
      this.filter = navigation.filter;
      this.applyFilter();
    }
    this.getData();
  }
  getData() {
    this.isLoading = true;
    this.employeeService.getEmployee().subscribe(
      (res: any) => {
        setTimeout(() => {
          this.isLoading = false;
          this.dataSource.data = res;
        }, 500);
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(): void {
    this.isLoading = true;
    const filterValue = this.filter.username || this.filter.email;
    setTimeout(() => {
      this.isLoading = false;
      this.dataSource.filterPredicate = (data, filter) => {
        var dataFilter 
        if(this.filter.username && this.filter.email){
          dataFilter = data.username.toLowerCase().includes(this.filter.username) &&
          data.email.toLowerCase().includes(this.filter.email)

        }else if(this.filter.username){
          dataFilter = data.username.toLowerCase().includes(this.filter.username)
        }
        else if(this.filter.email){
          dataFilter = data.email.toLowerCase().includes(this.filter.email)
        }
        return (
          dataFilter
          // data.username.toLowerCase().includes(this.filter.username) &&
          // data.email.toLowerCase().includes(this.filter.email)
        );
      };

      this.dataSource.filter = filterValue;
    }, 500);
  }
  editEmployee(employee: any): void {
    this.router.navigate(['/employee-edit'], {
      state: { data: employee, backPage: 'employee-list' },
    });

    // Add logic to navigate to an edit page or open a dialog for editing
  }
  detailEmployee(employee: any): void {
    this.router.navigate(['/employee-detail'], {
      state: { data: employee, backPage: 'employee-list', filter: this.filter },
    });

    // Add logic to navigate to an edit page or open a dialog for editing
  }

  deleteEmployee(employee: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService
          .delete(employee.id)
          .subscribe(() => this.getData());
      }
    });
  }
  onAddData() {
    this.router.navigate(['/employee-add']);
  }
}
