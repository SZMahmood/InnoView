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

  //TODO: Remove async and/or alert once sign-in component fixed
  async getLogins() {
    this.refreshLogins();
    alert("Fetching info from database...");
    return this.logins$();
  }

  getLogin(id: string) {
    this.httpClient.get<Login>(`${this.url}/login/${id}`).subscribe(login => {
      this.login$.set(login);
      return this.login$();
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