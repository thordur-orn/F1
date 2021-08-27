import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { TeamSeasons } from './teamSeasons';

@Injectable({
  providedIn: 'root'
})
export class ConstructorSeasonsService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private readonly constructorsUrl = 'api/v1/constructorseasons';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getConstructorSeasons(id: number): Observable<TeamSeasons[]> {
    const url = `${this.constructorsUrl}/${id}`;
    return this.http.get<TeamSeasons[]>(url).pipe(
      tap(_ => this.log(`fetched driver id=${id}`)),
      catchError(this.handleError<TeamSeasons[]>(`getConstructorSeasons id=${id}`))
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
