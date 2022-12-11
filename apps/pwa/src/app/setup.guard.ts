import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SetupGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    try {
      const user: Parse.User = Parse.User.current();
      if (!user) return false;

      const groupRel: Parse.Object<Parse.Attributes>[] = await user.relation('groups').query().find();

      if (groupRel.length === 0 && !state.url.startsWith('/group/add')) {
        // no group exist and user is not on add-group route
        return this.router.navigate(['/group/add'], {
          queryParams: { returnUrl: state.url },
        });
      } else if (groupRel.length > 0 && state.url.startsWith('/group/add')) {
        // Group exists and navigation to add-group is happening
        return this.router.navigate(['/'], {
          queryParams: { returnUrl: state.url },
        });
      }
    } catch (err) {
      if (err.code === 209) {
        const invalidSession = await Parse.Session.current();
        await invalidSession.destroy();
      }
    }

    return true;
  }
}
