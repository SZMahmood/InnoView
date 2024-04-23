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

verifyCredentials(name: string, email: string, password: string) {
  if (name == "" || email == "" || password == "") {
    alert("All fields are required.");
    return false;
  }
  const specCharRegex = /^[^<>%;$]*$/;
  if (!name.match(specCharRegex) || !password.match(specCharRegex)) {
    alert("Cannot use special characters: < > % ; $.");
    return false;
  }
  if (password.length < 5) {
    alert("Minimum password length is 5 characters.");
    return false;
  }
  //Loose email checking, ensures no escape sequence characters but restricts some valid addresses
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(emailRegex)) {
    alert("Email does not meet our formatting guidelines. Please ensure you are not using any special characters.");
    return false;
  }
  return true;
}

  onRegister() {
    const validCred = this.verifyCredentials(this.signUpObj.name, this.signUpObj.email, this.signUpObj.password);
    if (validCred == false) {
      return;
    }
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

  //TODO: Use JWT authorization and protect landing route
  async onLogin() {
    const email = this.loginObj.email;
    const password = this.loginObj.password;
    const validCred = this.verifyCredentials("filler", email, password);
    if (validCred == false) {
      return;
    }
    this.loginService.getLoginByCreds(email, password).then((login) => {
      if (login) {
        const loginStr = JSON.stringify(login);
        localStorage.setItem('loggedUser', loginStr);
        this.router.navigateByUrl('/landing');
        return;
      }
      alert ("Credentials not found in database.");
    }, function(error) {
      alert("Could not find credentials in database");
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