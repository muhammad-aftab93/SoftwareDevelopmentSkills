import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { baseApiUrl } from "../constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(baseApiUrl + '/courses');
  }

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

  search(title: string, author: string, category: string): Observable<any> {
    return this.http.post(baseApiUrl + '/courses/search', { title, author, category });
  }

  enroll(userId: string, courseId: string): Observable<any> {
    return this.http.post(baseApiUrl + '/courses/enroll', { userId, courseId });
  }

}
