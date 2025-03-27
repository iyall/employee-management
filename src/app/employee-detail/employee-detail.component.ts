import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = {};
  backPage: string = '';
  filter:any
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const navigation = window.history.state;

    if (navigation && navigation.data) {
      this.employee = navigation.data;
      this.backPage=navigation.backPage
      this.filter=navigation.filter
    }
  }

  goBack(): void {
    this.router.navigate(['/employee-list'], { state: { filter: this.filter } });
  }

  formatCurrencyIDR(value: number): string {
   
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2
    }).format(value);
  }
}