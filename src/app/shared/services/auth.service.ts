import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor() { }

  jwtHelper = new JwtHelperService();

  public isAuthenticated(): boolean 
  {
      const token = localStorage.getItem('token');

      return !this.jwtHelper.isTokenExpired(token);
  }
}
