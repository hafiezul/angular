import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  constructor(private http: HttpClient) {}

  // TODO: Get url from dotenv file
  private url = 'http://localhost:5500/api/vehicles';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /*
   * Get all vehicles
   */
  getVehicles(page: number): Observable<any> {
    return this.http
      .get<any>(this.url, {
        params: {
          page: page.toString(),
        },
      })
      .pipe(
        tap((_: any) => {
          console.log('fetched vehicles');
        })
      );
  }

  /*
   * Get vehicle by id
   */
  getVehicle(id: number): Observable<any> {
    console.log(`${this.url}/${id}`);
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      tap((_: any) => {
        console.log('fetched vehicle');
      })
    );
  }

  /*
   * Get all vehicles from a specific user
   */
  getVehiclesByUser(userId: number, page: number): Observable<any> {
    return this.http
      .get<any>(this.url, {
        params: {
          page: page.toString(),
          userId: userId.toString(),
        },
      })
      .pipe(
        tap((_: any) => {
          console.log('fetched vehicles');
        })
      );
  }

  /*
   * Post vehicle
   */
  postVehicle(vehicle: any): Observable<any> {
    return this.http.post<any>(this.url, vehicle, this.httpOptions).pipe(
      tap((_: any) => {
        console.log('posted vehicle');
      })
    );
  }

  /*
   * Update vehicle
   */
  putVehicle(vehicle: any): Observable<any> {
    return this.http.put<any>(this.url, vehicle, this.httpOptions).pipe(
      tap((_: any) => {
        console.log('updated vehicle');
      })
    );
  }
}
