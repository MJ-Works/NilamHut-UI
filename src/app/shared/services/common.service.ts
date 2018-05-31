import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, City, Tag } from '../Models/SharedModels';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends BaseService {

  constructor(private http: HttpClient) { super(); }

  public getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/api/Common/AllCategory`)
			.pipe(
				catchError(val => this.handleError(new HttpErrorResponse(val)))
			);
  }

  public getAllCity(): Observable<City[]>{
    return this.http.get<City[]>(`${environment.baseUrl}/api/Common/AllCity`)
			.pipe(
				catchError(val => this.handleError(new HttpErrorResponse(val)))
			);
  }

  public getAllTag(): Observable<Tag[]>{
    return this.http.get<Tag[]>(`${environment.baseUrl}/api/Common/AllTags`)
			.pipe(
				catchError(val => this.handleError(new HttpErrorResponse(val)))
			);
  }

}
