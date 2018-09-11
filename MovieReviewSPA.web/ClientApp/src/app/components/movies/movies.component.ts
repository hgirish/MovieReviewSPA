import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { ToastrService } from 'ngx-toastr';
import { config } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movie: Movie
  movies: Movie[]
  constructor(private moviesService: MoviesService, private toastr:ToastrService) { }

  ngOnInit() {
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
    //  this.toastr.success(`Fetched ${movies.length} movies.`)
     // console.log("Movies: ", this.movies);
    })
  }

  delete(id) {
    if (confirm("Are you sure?")) {
      this.moviesService.deleteMovie(id)
        .subscribe(x => {
          this.movies = this.movies.filter(m => m.id !== id)
          this.toastr.success('Movie Deleted', 'SUCCESS', {
            timeOut: 5000,
            closeButton:true
          })
        },
        err => {
          this.toastr.error('An unexpected error while deleting the record',
            'ERROR',
            { timeOut: 30000, closeButton: true })
        }
        )
      
    }
  }
}
