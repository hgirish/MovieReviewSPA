import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,
    private toastr: ToastrService) { }

  getMovies(filter): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + '/api/movies/?'+this.toQueryString(filter));        
  }
  getMoviesCount():Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + '/api/movies');
  }
  getMovie(id): Observable<Movie> {
    return this.http.get<Movie>('/api/movies/'+id)
  }
  createMovie(movie: Movie) : Observable<Movie> {
    return this.http.post<Movie>('/api/movies', movie).pipe(
      //tap((movie: Movie) => this.log(`added movie with id=${movie.id}`))
      //, catchError(this.handleError<Movie>('createMovie')      )
    )
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>('/api/movies/' + movie.id, movie)
    //  .pipe(
    //  tap((movie:Movie)=>this.log(`update movie with id: ${movie.id}`))
    //)
  }

  deleteMovie(id): Observable<any> {
    return this.http.delete('/api/movies/'+id)
  }

  toQueryString(obj) {
    var parts = [];
    
    for (var property in obj) {
      var value = obj[property];
      if (value !== null && value !== undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.join('&');
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.toastr.error(message, 'ERROR', { closeButton: true, timeOut:30000 });
  }
}
