import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

baseUrl = environment.apiUrl + 'users/';

constructor(private http: HttpClient) { }

register(body: any) {
  return this.http.post(this.baseUrl + 'register', body);

}

login(body: any) {
  return this.http.post(this.baseUrl + 'login', body);
}

authenticate() {
  return this.http.get(this.baseUrl + 'authenticate', {
    observe: 'body',
    params: new HttpParams().append('token', localStorage.getItem('token'))
  });
}


}
