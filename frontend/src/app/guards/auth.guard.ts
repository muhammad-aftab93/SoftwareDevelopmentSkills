import { inject } from '@angular/core';
import { Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { map} from 'rxjs';
import { selectIsLoggedIn } from '../ngrx/selectors/login.selectors';

export function authGuard() {
    const store: Store = inject(Store);
    const router: Router = inject(Router);

    return store.select(selectIsLoggedIn).pipe(
      map(isLoggedIn =>  !isLoggedIn ? router.parseUrl('/user-management/login') : isLoggedIn)
    );

};
