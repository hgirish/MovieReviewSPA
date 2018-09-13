import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
    

  constructor(private http: HttpClient) { }

  getReviewsByMovieId(movieId):Observable<Review[]> {
    return this.http.get<Review[]>('/api/moviereviews/' + movieId);
  }

  getReviewById(id) : Observable<Review> {
    return this.http.get<Review>('/api/moviereviews/GetByReviewId/' + id)
  }
  getRatings(id): Observable<number[]> {
    return this.http.get<number[]>('/api/moviereviews/GetRatings/' + id)
  }
  createReview(movieId:number,review: Review) : Observable<Review> {
    return this.http.post<Review>('/api/moviereviews/'+movieId, review);

  }

  updateReview(review: Review): Observable<any> {
    return this.http.put('/api/moviereviews/',review);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete('/api/moviereviews/' + id);
  }

  
}
