import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getReviewById(id) {
    return this.http.get<Review[]>('/api/moviereviews/' + id);
  }

  createReview(movieId:number,review: Review) : Observable<Review> {
    return this.http.post<Review>('/api/moviereviews/'+movieId, review);

  }
}
