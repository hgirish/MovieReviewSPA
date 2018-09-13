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
  movie: Movie = new Movie();
  allMovies:Movie[]
  movies: Movie[]
  totalMovies = 0;
  filter: any = {}
  query: any = {
    pageSize: 3,
    allMovies:10
  }
  constructor(private moviesService: MoviesService, private toastr:ToastrService) { }

  ngOnInit() {
    this.moviesService.getMovies(this.query).subscribe(movies => {
      this.movies = this.allMovies = movies;
    //  this.toastr.success(`Fetched ${movies.length} movies.`)
     // console.log("Movies: ", this.movies);
    })

    this.moviesService.getMoviesCount().subscribe(movies => {
      this.totalMovies = movies.length;
      console.log("Total Movies: ", this.totalMovies);
    })
  }

  onDropdownChange() {
   
    var movies = this.allMovies;
    if (this.filter.id) {
    
      movies = movies.filter(m => m.id === +this.filter.id);
     
    }
    this.movies= movies;
  }

  onResetFilter() {
    this.filter = {};
    this.onDropdownChange();
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

  private populateMovies() {
    this.moviesService.getMovies(this.query).subscribe(result => {
      this.movies = result;
    })
  }

  onPageChange(page) {
    this.query.page = page;
    this.populateMovies();
  }
}
