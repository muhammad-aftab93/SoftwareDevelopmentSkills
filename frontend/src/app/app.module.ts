import { ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ActionReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { loginReducer } from './ngrx/reducers/login.reducer';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { GlobalErrorHandler } from './interceptors/global-error-handler';
import { CommonModule } from "@angular/common";
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot(loginReducer, {
      metaReducers: [localStorageSyncReducer],
    }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  }
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['loginState'], rehydrate: true })(reducer);
}
