import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {
  review:Review = new Review()
  constructor() { }

  ngOnInit() {
  }

}
