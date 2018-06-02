import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, City, Tag } from '../Models/SharedModels';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SearchContent, ProductHome } from '../Models/Home';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends BaseService {
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, public auth: AuthService) { super(); }

  public addCategory(data)
  {
    return this.http.post(`${environment.baseUrl}/api/Common/AddCategory`,data).pipe(
      catchError(val => this.handleError(new HttpErrorResponse(val)))
    );
  }
  public getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/api/Common/AllCategory`)
      .pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  public deleteFromCategory(id)
  {
      return this.http.delete(`${environment.baseUrl}/api/Common/DeleteCategory/${id}`).pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  public getAllCity(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.baseUrl}/api/Common/AllCity`)
      .pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }
  public addCity(data)
  {
    return this.http.post(`${environment.baseUrl}/api/Common/AddCity`,data).pipe(
      catchError(val => this.handleError(new HttpErrorResponse(val)))
    );
  }

  public deleteFromCity(id)
  {
      return this.http.delete(`${environment.baseUrl}/api/Common/DeleteCity/${id}`).pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  public getAllTag(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.baseUrl}/api/Common/AllTags`)
      .pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  public getAllProducts(model: SearchContent): Observable<ProductHome[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.http.post<ProductHome[]>(`${environment.baseUrl}/api/common/GetSearchProducts`, model, httpOptions)
      .pipe(
        catchError(val => this.handleError(new HttpErrorResponse(val)))
      );
  }

  public getUserId()
  {
      return localStorage.getItem('user_id');
  }

  isAuthenticated()
  {
    if(!this.auth.isAuthenticated())
      return false;
    return true;
  }

  isAdmin()
  {
    const token = localStorage.getItem('token');

      const tokenPayload = this.jwtHelper.decodeToken(token);

      if(!this.auth.isAuthenticated() || tokenPayload.nonce != "Administrator")
          return false;

      return true;
  }

  getUserName()
  {
    const token = localStorage.getItem('token');

    const tokenPayload = this.jwtHelper.decodeToken(token);

    return tokenPayload.sub;
  }

}
