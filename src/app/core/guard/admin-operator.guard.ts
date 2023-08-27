import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminOperatorGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.currentUserValue.Roles?.includes('Admin') || this.authService.currentUserValue.Roles?.includes('Operator')) {
      return true;
    }

    this.router.navigate(['/authentication/signin'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
