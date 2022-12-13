import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    try {
      if(Parse.User.current()){
        return true
      }
    } catch (err){
      if (err.code === 209) {
        const invalidSession = await Parse.Session.current();
        await invalidSession.destroy()
      }
    }

    this.router.navigate(['account','login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
