import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { SeasonResults } from './seasonResults';

@Injectable({
  providedIn: 'root'
})
export class SeasonResultsService {

  private readonly resultsUrl = 'api/v1/results';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getResults(year: number): Observable<SeasonResults[]> {
    const url = `${this.resultsUrl}/${year}`;
    return this.http.get<SeasonResults[]>(url).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<SeasonResults[]>('getResults', []))
    );
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
