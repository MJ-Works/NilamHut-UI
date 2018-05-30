import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export class BaseService {

  constructor() { }
  protected handleError(error: HttpErrorResponse): Observable<never> {

    var modelStateErrors: string = '';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
      modelStateErrors = error.error.message;
      
    } else { //Here we merge all model state errors
      var serverError = error.error;
      if (serverError != null) {
        for (var key1 in serverError) {
          if (serverError[key1])
            modelStateErrors += serverError[key1][0] + '\n';
        }
      }
    }

    modelStateErrors = modelStateErrors == '' ? 'Something bad happened; please try again later.' : modelStateErrors;
    //return an ErrorObservable with a user-facing error message
    return throwError(modelStateErrors);
  }
}
