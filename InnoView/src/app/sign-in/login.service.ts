import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:5200';
  logins$ = signal<Login[]>([]);
  login$ = signal<Login>({} as Login);
 
  constructor(private httpClient: HttpClient) { }

  private async refreshLogins() {
    this.httpClient.get<Login[]>(`${this.url}/login`)
      .subscribe(logins => {
        this.logins$.set(logins);
      });
  }

  getLogins() {
    this.refreshLogins();
    return this.logins$();
  }

  getLogin(id: string) {
    this.httpClient.get<Login>(`${this.url}/login/${id}`).subscribe(login => {
      this.login$.set(login);
      return this.login$();
    });
  }

  getLoginByCreds(email: string, password: string) {
    return this.httpClient.get<Login>(`${this.url}/login/${email}`).toPromise()
      .then(login => {
        if (login && login.password == password) {
          this.login$.set(login);
          return login;
        }
        return undefined;        
      });
  }

  createLogin(login: Login) {
    return this.httpClient.post(`${this.url}/login`, login, { responseType: 'text' });
  }

  updateLogin(id: string, login: Login) {
    return this.httpClient.put(`${this.url}/login/${id}`, login, { responseType: 'text' });
  }

  deleteLogin(id: string) {
    return this.httpClient.delete(`${this.url}/login/${id}`, { responseType: 'text' });
  }
}