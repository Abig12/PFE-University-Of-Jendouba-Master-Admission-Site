import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';

@Injectable({
  providedIn: 'root',
})
export class GuarduserGuard implements CanActivate {
  constructor(private ls: AuthUserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.ls.loggedin() == true) {
      let role = this.ls.getrole();
      if (role === 'agentuj') {
        this.router.navigate(['/adminuj']);
        return false;
      }
      if (role === 'agenteet') {
        this.router.navigate(['/adminees']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
