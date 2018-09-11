import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { Movie } from '../../models/movie';
import { ReviewsService } from '../../services/reviews.service';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {
  review: Review = new Review();
  movie: Movie = new Movie();
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
    if (this.review.movieId) {
      this.moviesService.getMovie(this.review.movieId)
        .subscribe((movie: Movie) => {
          if (movie) {
            this.movie = movie;
          } else {
            this.router.navigate(['/movies'])
          }
        }, err => {
          this.router.navigate(['/movies'])
        })
    }
  }

  onSubmit(form: NgForm) {
    var formData = this.review;
    formData.id = 0;
    formData.reviewerName = this.review.reviewerName.toString();
    formData.reviewerComments = this.review.reviewerComments.toString();
    formData.reviewerRating = this.review.reviewerRating;
    formData.movieId = this.review.movieId; console.log(formData);
    console.log(formData);
    this.reviewsService.createReview(this.review.movieId, formData)
      .subscribe(x => {
        console.log(x);
        this.toastr.success('New review crated!', 'Success', {
          timeOut: 5000, closeButton:true
        })
        this.router.navigate(['/movies'])
      }, err => {
        this.toastr.error('An unexpected error occured while creating new review!',
          'ERROR', { closeButton:true, timeOut:30000 })
      })
    


  }

}
