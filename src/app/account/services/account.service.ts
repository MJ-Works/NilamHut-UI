import { Injectable } from '@angular/core';
import { Login } from '../models/Login';
import { Register } from '../models/Register';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  constructor(private http: HttpClient) { super() }

  register(_register:Register)
  {
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
}
