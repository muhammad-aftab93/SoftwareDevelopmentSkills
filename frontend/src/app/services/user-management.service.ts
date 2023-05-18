import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { baseApiUrl } from "../constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(baseApiUrl + '/users/login', { username, password })
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post(baseApiUrl + '/users/signup', { username, password })
  }
}
