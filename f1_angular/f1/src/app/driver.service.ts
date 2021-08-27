import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Driver } from './driver';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class DriverService {
  
  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private readonly driversUrl = 'api/v1/drivers';
  private readonly driverSearchUrl = 'api/v1/drivernames'
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.driversUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Driver[]>('getDrivers', []))
    );
  }

  getDriver(id: number): Observable<Driver> {
    const url = `${this.driversUrl}/${id}`;
    return this.http.get<Driver>(url).pipe(
      tap(_ => this.log(`fetched driver id=${id}`)),
      catchError(this.handleError<Driver>(`getDriver id=${id}`))
    );
  }
  
  getDriverNo404<Data>(id: number): Observable<Driver> {
    const url = `${this.driversUrl}/?id=${id}`;
    return this.http.get<Driver>(url)
      .pipe(
        tap(d => {
          const outcome = d ? `fetched` : `did not find`;
          this.log(`${outcome} driver id=${id}`);
        }),
        catchError(this.handleError<Driver>(`getDriver id=${id}`))
      );
  }

  updateDriver(driver: Driver): Observable<any> {
    return this.http.put(this.driversUrl, driver, this.httpOptions).pipe(
      tap(_ => this.log(`updated driver id=${driver.id}`)),
      catchError(this.handleError<any>('updateDriver'))
    )
  }

  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.driversUrl, driver, this.httpOptions).pipe(
      tap((newDriver: Driver) => this.log(`added driver w/ id=${newDriver.id}`)),
      catchError(this.handleError<Driver>('addDriver'))
    )
  }

  deleteDriver(id: number): Observable<Driver> {
    const url = `${this.driversUrl}/${id}`;

    return this.http.delete<Driver>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted driver id=${id}`)),
      catchError(this.handleError<Driver>('deleteDriver'))
    )
  }
  
  searchDriver(term: string): Observable<Driver[]> {
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Driver[]>(`${this.driversUrl}?searchQuery=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found drivers matching "${term}"`) :
        this.log(`no drivers matching "${term}"`)),
      catchError(this.handleError<Driver[]>('searchDrivers', []))
    )
  }

  private log(message: string){
    this.messageService.add(`DriverService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
