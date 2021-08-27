import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Team } from './team';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private readonly teamsUrl = 'api/v1/teams';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl).pipe(
      tap(_ => this.log('fetched teams')),
      catchError(this.handleError<Team[]>('getTeams', []))
    );
  }

  getTeam(id: number): Observable<Team> {
    const url = `${this.teamsUrl}/${id}`;
    return this.http.get<Team>(url).pipe(
      tap(_ => this.log(`fetched team id=${id}`)),
      catchError(this.handleError<Team>(`getTeam id=${id}`))
    );
  }

  searchTeam(term: string): Observable<Team[]> {
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Team[]>(`${this.teamsUrl}?searchQuery=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found teams matching "${term}"`) :
        this.log(`no teams matching "${term}"`)),
      catchError(this.handleError<Team[]>('searchTeams', []))
    )
  }

  private log(message: string){
    this.messageService.add(`TeamService: ${message}`);
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
