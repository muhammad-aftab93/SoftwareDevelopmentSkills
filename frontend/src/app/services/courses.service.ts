import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { baseApiUrl } from "../constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  add(title: string, author: string, category: string, price: string): Observable<any> {
    return this.http.post(baseApiUrl + '/courses', {
      title,
      author,
      category,
      price,
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(baseApiUrl + '/courses/' + id);
  }

}
