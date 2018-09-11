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
      .subscribe((movie: Movie) => {
        console.log(movie);
        if (movie) {
          this.toastr.success(`movie added: ${movie.id}`)
          this.router.navigate(['/movies'])
        } else {
          this.toastr.error('ERROR occured ')
        }
      }, err => {
        this.toastr.error(`An unexpected error occured while creating new movie! ${err}`,'Error')
      });
   
    

  }

}
