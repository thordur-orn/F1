import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Driver } from './driver';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private readonly winsUrl = 'api/v1/wins';
  private readonly podiumsUrl = 'api/v1/podiums';
  private readonly fastestLapsUrl = 'api/v1/fastestlaps';
  private readonly entriesUrl = 'api/v1/entries';
  private readonly polesUrl = 'api/v1/poles';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMostWins(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.winsUrl).pipe(
      tap(_ => this.log('fetched drivers')),
      catchError(this.handleError<Driver[]>('getMostWins', []))
    );
  }

  getMostPodiums(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.podiumsUrl).pipe(
      tap(_ => this.log('fetched drivers')),
      catchError(this.handleError<Driver[]>('getMostPodiums', []))
    );
  }

  getFastestLaps(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.fastestLapsUrl).pipe(
      tap(_ => this.log('fetched drivers')),
      catchError(this.handleError<Driver[]>('getFastestLaps', []))
    );
  }

  getMostEntries(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.entriesUrl).pipe(
      tap(_ => this.log('fetched drivers')),
      catchError(this.handleError<Driver[]>('getMostEntries', []))
    );
  }

  getMostPoles(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.polesUrl).pipe(
      tap(_ => this.log('fetched drivers')),
      catchError(this.handleError<Driver[]>('getMostPoles', []))
    );
  }

  private log(message: string){
    this.messageService.add(`StatisticsService: ${message}`);
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
