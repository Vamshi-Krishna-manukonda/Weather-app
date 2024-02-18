import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterLink, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  routeURL!: string;
  rooote !: string;
  loggedInUser: any = "";
  constructor(private regisserv: RegistrationService, private router: Router) {
    this.routeURL = this.router.url;
    this.loggedInUser = localStorage.getItem("UserLogin");
    console.log(this.routeURL)
    console.log(this.loggedInUser);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if ((this.loggedInUser)) {
        this.regisserv.getUser().subscribe((user) => {
          console.log(user);
          if (!user && this.routeURL !== '/login') {
            this.routeURL = '/login';
            this.router.navigate(['/login'], {
              queryParams: {
                return: 'login'
              }
            });
            return resolve(false);
          } else {

            this.routeURL = this.router.url;
            return resolve(true);
          }
        });
      }
      else if(!(this.loggedInUser)){
        this.router.navigate(['/login']);
      }
    });
  }
}
