import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Driver } from './driver';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TeamDriversService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private readonly constructorsUrl = 'api/v1/constructors';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getDrivers(id: number): Observable<Driver[]> {
    const url = `${this.constructorsUrl}/${id}/drivers`;
    return this.http.get<Driver[]>(url).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Driver[]>('getDrivers', []))
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
