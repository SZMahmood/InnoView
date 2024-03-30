import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  
  isSignDivVisiable: boolean  = true;

  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router, private loginService: LoginService){  }


  onRegister() {
    this.loginService.createLogin(this.signUpObj).subscribe({
      next: () => {
        localStorage.setItem('loggedUser', JSON.stringify(this.signUpObj));
        alert("Registration successful!");
        this.router.navigateByUrl('/landing');
      },
      error: (error) => {
        alert('Failed to register new account');
        console.error(error);
      },
    });
  }

  //TODO: Fix asynchronous issues. Only works currently because getLogins() makes an alert.
  async onLogin() {
    this.loginService.getLogins().then((dbUsers) => {
      for (const user of dbUsers) {
        if (user.email == this.loginObj.email && user.password == this.loginObj.password) {
          localStorage.setItem('loggedUser', JSON.stringify(user));
          this.router.navigateByUrl('/landing');
          return;
        }
      }
      alert ("Credentials not found in database.");
    }, function(error) {
      alert("Unable to access database");
    });
  }

}

export class SignUpModel implements Login {
  name: string;
  email: string;
  password: string;
  _id?: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.password= ""
  }
}

export class LoginModel  { 
  email: string;
  password: string;
  _id?: string;

  constructor() {
    this.email = ""; 
    this.password= ""
  }
}