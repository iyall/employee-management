import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  users: any[] = [];
  form: any = {
    username: '',
    password: ''
  };
  showIcon:boolean=false
  passwordType:string='password'
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loadUsers();

    
  }

  loadUsers(): void {
    this.http.get<any[]>('/assets/user.json').subscribe((data) => {
      this.users = data;
      console.log('Users loaded', this.users);
    });
  }

  login(username: string, password: string): void {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.authService.setLoginStatus(true);
      this.router.navigate(['employee-list']);


    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Login",
        text: "Username or password is incorrect. Please try again."
      });
    }
  }
  onChange() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.showIcon = true;
    } else {
      this.passwordType = 'password';
      this.showIcon = false;
    }
  }
}
