import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user-validator';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // TODO: Get url from dotenv file
  private url = 'http://localhost:5500/api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /*
   * Get all users
   */
  getUsers(page: number): Observable<User[]> {
    return this.http
      .get<User[]>(this.url, {
        params: {
          page: page.toString(),
        },
      })
      .pipe(
        tap((_: any) => {
          console.log('fetched users');
        })
      );
  }

  /*
   * Get user by id
   */
  getUser(id: number): Observable<User> {
    console.log(`${this.url}/${id}`);
    return this.http.get<User>(`${this.url}/${id}`).pipe(
      tap((_: any) => {
        console.log('fetched user');
      })
    );
  }

  /*
   * Post user
   */
  postUser(user: any): Observable<User> {
    return this.http.post<User>(this.url, user, this.httpOptions).pipe(
      tap((_: any) => {
        console.log('posted user');
      })
    );
  }

  /*
   * Put user
   */
  putUser(user: any): Observable<User> {
    return this.http
      .put<User>(`${this.url}/${user.UserID}`, user, this.httpOptions)
      .pipe(
        tap((_: any) => {
          console.log('put user');
        })
      );
  }

  /*
   * Delete user
   */
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`).pipe(
      tap((_: any) => {
        console.log('deleted user');
      })
    );
  }
}
