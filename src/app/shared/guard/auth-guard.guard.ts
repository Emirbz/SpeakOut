import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private routes: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = localStorage.getItem('user');
    const userRole = localStorage.getItem('USER_ROLE');

    if (user) {
      // check if route is restricted by role
      if (userRole && next.data.roles && next.data.roles.indexOf(userRole) === -1) {
        // role not authorised so redirect to home page
        this.routes.navigate(['/home']);
        return false;
      }

      // authorised so return true
      return true;
    }
    this.routes.navigate(['/home']);
    return false;

  }

}
