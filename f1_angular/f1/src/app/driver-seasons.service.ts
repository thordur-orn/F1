import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DriverSeasons } from './driverSeasons';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DriverSeasonsService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private readonly driversUrl = 'api/v1/driverseasons';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getDriverSeasons(id: number): Observable<DriverSeasons[]> {
    const url = `${this.driversUrl}/${id}`;
    return this.http.get<DriverSeasons[]>(url).pipe(
      tap(_ => this.log(`fetched driver id=${id}`)),
      catchError(this.handleError<DriverSeasons[]>(`getDriverSeasons id=${id}`))
    );
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
