import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../../services/reviews.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {
  review:Review = new Review()
  constructor(private route: ActivatedRoute,
    private router: Router,
    private reviewsService: ReviewsService,
  private toastr:ToastrService) {
    route.params.subscribe(p => {
      this.review.id = +p['id'];
    })
  }

  ngOnInit() {
    if (this.review.id) {
      this.reviewsService.getReviewById(this.review.id)
        .subscribe(m => {
          this.review = m;
          console.log("Review: ", this.review);
        }, err => {
          if (err.status === 404) {
            this.router.navigate(['/movies'])
          }
        })
    }
  }

  onSubmit() {
    if (this.review.id) {
      this.reviewsService.updateReview(this.review)
        .subscribe(x => {
          console.log(x);
          this.toastr.success('Review Updated', 'Success', { timeOut: 5000, closeButton: true });
          this.router.navigate(['/movies'])
        }, err => {
          this.toastr.error('An unexpected error while updating the record!', "ERROR", {
            timeOut:10000, closeButton:true
          })
        })
    }
  }

}
