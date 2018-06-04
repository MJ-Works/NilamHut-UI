import { Injectable } from '@angular/core';
import { Login } from '../models/Login';
import { Register } from '../models/Register';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserInfo, UserBid, UserPost, UserData } from '../models/UserModels';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  constructor(private http: HttpClient) { super() }

  register(_register: Register) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.http.post(`${environment.baseUrl}/api/account/register`, _register, httpOptions)
      .pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  login(_login: Login) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.http.post(`${environment.baseUrl}/api/account/login`, _login, httpOptions)
      .pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  storeToken(auth: any) {
    localStorage.setItem('token', auth.auth_token);
    localStorage.setItem('user_id', auth.id);
  }

  getUserInfo(userId: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${environment.baseUrl}/api/Users/${userId}`)
      .pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  getUserBids(userId: string): Observable<UserBid[]> {
    return this.http.get<UserBid[]>(`${environment.baseUrl}/api/Users/UserBids/${userId}`)
      .pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  getUserPosts(userId: string): Observable<UserPost[]> {
    return this.http.get<UserPost[]>(`${environment.baseUrl}/api/Users/UserPosts/${userId}`)
      .pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  updateProfileInfo(model: UserData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.put(`${environment.baseUrl}/api/Users`, model, httpOptions)
      .pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

}
