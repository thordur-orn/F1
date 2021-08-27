import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Circuit } from './circuit';
import { MessageService } from './message.service';
import { RaceWinner } from './raceWinners';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private readonly circuitsUrl = 'api/v1/circuits';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCircuits(): Observable<Circuit[]> {
    return this.http.get<Circuit[]>(this.circuitsUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Circuit[]>('getCircuits', []))
    );
  }

  getCircuit(id: number): Observable<Circuit> {
    const url = `${this.circuitsUrl}/${id}`;
    return this.http.get<Circuit>(url).pipe(
      tap(_ => this.log(`fetched circuit id=${id}`)),
      catchError(this.handleError<Circuit>(`getCircuit id=${id}`))
    );
  }

  getCircuitWinners(id: number): Observable<RaceWinner[]> {
    const url = `${this.circuitsUrl}/${id}/winners`;
    return this.http.get<RaceWinner[]>(url).pipe(
      tap(_ => this.log(`fetched circuit winners id=${id}`)),
      catchError(this.handleError<RaceWinner[]>(`getCircuitWinners id=${id}`))
    )
  }

  private log(message: string){
    this.messageService.add(`CircuitService: ${message}`);
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
