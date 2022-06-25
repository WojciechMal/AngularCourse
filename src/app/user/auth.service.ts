import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IUser } from './user.model';
import { catchError, of } from 'rxjs';

@Injectable()
export class AuthService {
  currentUser: IUser | undefined;

  constructor(private http: HttpClient) {}

  loginUser(userName: string, password: string) {
    const loginInfo = { username: userName, password: password };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post('/api/login', loginInfo, options)
      .pipe(
        tap((data) => {
          this.currentUser = <IUser>data['user'];
        })
      )
      .pipe(
        catchError((err) => {
          return of(false);
        })
      );
  }
  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser!.firstName = firstName;
    this.currentUser!.lastName = lastName;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put(`/api/users/${this.currentUser!.id}`, this.currentUser, options);
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    this.http
      .get('/api/currentIdentity')
      .pipe(
        tap((data) => {
          if (data instanceof Object) {
            this.currentUser = <IUser>data;
          }
        })
      )
      .subscribe();
    // .subscribe(data => {
    //   if (data instanceof Object) {
    //     this.currentUser = <IUser>data;
    //   }
    // } ) //the same result as .pipe(tap(...))
  }

  logout(){
    this.currentUser = undefined;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post('/api/logout', {}, options);
  }
}
