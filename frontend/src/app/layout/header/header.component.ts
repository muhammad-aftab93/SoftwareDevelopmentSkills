import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/ngrx/actions/login.actions';
import { selectIsLoggedIn, selectUserRole } from 'src/app/ngrx/selectors/login.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  userRole$ = this.store.select(selectUserRole);

  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  onLogout(): void {
    this.store.dispatch(logout());
    this.router.navigate(["/"]);
  }

}
