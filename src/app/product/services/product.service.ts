import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService{

  constructor(private http: HttpClient) { super() }

  addProduct(formData: FormData)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        
      })
    }

    return this.http.post(`${environment.baseUrl}/api/product`,formData, httpOptions)
                    .pipe(catchError(val => this.handleError(new HttpErrorResponse(val)))
                  );

  }

  getProduct(id : string) : Observable<Product>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        
      })
    }

    return this.http.get<Product>(`${environment.baseUrl}/api/product/GetWithData/${id}`, httpOptions)
                    .pipe(catchError(val => this.handleError(new HttpErrorResponse(val)))
                  );
  }
}
