import {CanActivateFn, Router} from '@angular/router';
import {selectUserRole} from "../ngrx/selectors/login.selectors";
import {map} from "rxjs";
import {Store} from "@ngrx/store";
import {inject} from "@angular/core";

export const roleGuard: CanActivateFn = (route, state) => {
  const store: Store = inject(Store);
  const router: Router = inject(Router);
  const expectedRole = route.data['expectedRole'];

  return store.select(selectUserRole).pipe(
    map(role =>  expectedRole !== role ? router.parseUrl('/courses/search') : expectedRole)
  );

};
