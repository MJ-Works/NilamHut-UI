import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class RoleGuardService implements CanActivate {

    jwtHelper = new JwtHelperService();
    roleMatch : boolean;

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean
  {
      const expectedRole = route.data.expectedRole;

      const token = localStorage.getItem('token');

      const tokenPayload = this.jwtHelper.decodeToken(token);
    
      this.roleMatch = false;
      if(tokenPayload.Rol === expectedRole)
            this.roleMatch = true;
    
      if(!this.auth.isAuthenticated() || !this.roleMatch)
      {
          this.router.navigate(['/signin']);
          return false;
      }

      return true;
  }
}
