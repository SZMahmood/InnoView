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
    //debugger;
    const localUser = localStorage.getItem('angular17users');
    if(localUser != null) {
      const users =  JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('angular17users', JSON.stringify(users));
      this.loginService.createLogin(this.signUpObj).subscribe({
        next: () => {
          this.router.navigateByUrl('/landing');
        },
        error: (error) => {
          alert('Failed to register new account');
          console.error(error);
        },
      });
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('angular17users', JSON.stringify(users));
      this.loginService.createLogin(this.signUpObj).subscribe({
        next: () => {
          this.router.navigateByUrl('/landing');
        },
        error: (error) => {
          alert('Failed to register new account');
          console.error(error);
        },
      });
    }
    alert('Registration Success')
  }

  onLogin() {
    //debugger;
    const localUsers =  localStorage.getItem('angular17users');
    if(localUsers != null) {
      const users =  JSON.parse(localUsers);

      const isUserPresent =  users.find( (user:SignUpModel)=> user.email == this.loginObj.email && user.password == this.loginObj.password);
      if(isUserPresent != undefined) {
        alert("User Found...");
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/landing');
      } else {
        alert("No User Found")
      }
    }
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