import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[]
  constructor(private moviesService: MoviesService, private toastr:ToastrService) { }

  ngOnInit() {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
    //  this.toastr.success(`Fetched ${movies.length} movies.`)
     // console.log("Movies: ", this.movies);
    })
  }
}
