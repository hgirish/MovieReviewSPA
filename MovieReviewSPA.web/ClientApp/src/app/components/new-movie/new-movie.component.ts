import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  movie: Movie = new Movie();

  constructor(private moviesService: MoviesService, private router:Router, private toastr:ToastrService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    var formData = this.movie;
    formData.id = 0;
    formData.movieName = this.movie.movieName.toString();
    formData.directorName = this.movie.directorName.toString();
    formData.releaseYear = this.movie.releaseYear.toString();
    console.log(formData);
    this.moviesService.createMovie(formData)
      .subscribe(x => console.log(x));
    this.toastr.success('movie added')
    this.router.navigate(['/movies'])

  }

}
