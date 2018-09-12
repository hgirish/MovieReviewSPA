import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewsService } from '../../services/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[];
  movie: Movie = new Movie();
  review: Review = new Review();
  filter: any = {};

  constructor(private reviewsService: ReviewsService,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    route.params.subscribe(p => {
      this.review.movieId = +p['id'];
    })
  }

  ngOnInit() {
    this.reviewsService.getReviewsByMovieId(this.review.movieId)
      .subscribe(reviews => {
        this.reviews = reviews;
        console.log("Reviews: " , this.reviews)
      })
    if (this.review.movieId) {
      this.moviesService.getMovie(this.review.movieId)
        .subscribe((m: Movie) => {
          if (m) {
            this.movie = m;
          } else {
            this.router.navigate(['/movies']);
          }
          
        }, err => {
          if (err.status === 404) {
            this.router.navigate(['/movies']);
          }
        })
    }
  }

  delete(id) {
    if (confirm("Are you sure, you want to delete this review?")) {
      this.reviewsService.deleteReview(id).
        subscribe(x => {
          this.reviews = this.reviews.filter(m => m.id !== id)
          this.toastr.success("Review deleted", "Success", { timeOut: 5000, closeButton: true })
          //this.router.navigate(['/movies'])
        }, err => {
          this.toastr.error("An unexpected error while deleting the review", "ERROR", { closeButton: true, timeOut:10000 })
        })
    }
  }

}
