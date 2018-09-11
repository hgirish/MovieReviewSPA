import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movie: Movie = new Movie();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
  private toastr: ToastrService) {
    route.params.subscribe(p => {
      this.movie.id = +p['id'];
    })
  }

  ngOnInit() {
    if (this.movie.id) {
      this.moviesService.getMovie(this.movie.id)
        .subscribe(m => {
          this.movie = m
        }, err => {
          if (err.status === 404) {
            this.router.navigate(['/'])
          }
        })
    }
  }

  onSubmit() {
    if (this.movie.id) {
      this.moviesService.updateMovie(this.movie)
        .subscribe(x => {
          this.toastr.success('Movie updated', 'SUCCESS', {
            timeOut: 5000, closeButton: true
          })
          this.router.navigate(['/movies'])
        }, err => {
          this.toastr.error('An unexpected error while updating the record!', 'ERROR', {
            timeOut: 30000, closeButton:true
          })
        });
      
    }
  }

}
