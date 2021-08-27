import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ConstructorStandings } from './constructorStandings';
import { DriverStandings } from './driverStandings';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }
    
  private readonly driversUrl = 'api/v1/standings';
  private readonly constructorsUrl = 'api/v1/constructorStandings';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  getDriverStandings(year: number): Observable<DriverStandings[]> {
    const url = `${this.driversUrl}/${year}`;
    return this.http.get<DriverStandings[]>(url).pipe(
      tap(_ => this.log('fetched standings')),
      catchError(this.handleError<DriverStandings[]>('getDriverStandings', []))
    );
  }

  getConstructorStandings(year: number): Observable<ConstructorStandings[]> {
    const url = `${this.constructorsUrl}/${year}`;
    return this.http.get<ConstructorStandings[]>(url).pipe(
      tap(_ => this.log('fetched standings')),
      catchError(this.handleError<ConstructorStandings[]>('getConstructorStandings', []))
    )
  }

  private log(message: string){
    this.messageService.add(`StandingsService: ${message}`);
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
