import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl + '/api/movies');        
  }
}
