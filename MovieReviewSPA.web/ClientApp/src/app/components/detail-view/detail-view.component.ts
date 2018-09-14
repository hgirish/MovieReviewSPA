import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { ToastrService } from 'ngx-toastr';
import { ImagesService } from '../../services/images.service';
import { Image } from '../../models/image';


@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  movie: Movie = new Movie();
  photos: any[];
  images: Image[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
    private imagesService: ImagesService,
    private toastr: ToastrService
  ) {
    route.params.subscribe(p => {
      this.movie.id = +p['id'];
    });
  }

  ngOnInit() {
    if (this.movie.id) {
      this.moviesService.getMovie(this.movie.id)
        .subscribe(m => {
          this.movie = m;
        },
        err => {
          if (err.status === 404) {
            this.router.navigate(['/']);
          }
        })
      this.imagesService.getImages(this.movie.id)
        .subscribe(images => {
          this.images = images;
        })

    }
  }

  onSubmit() {
    if (this.movie.id) {
      this.moviesService.updateMovie(this.movie)
        .subscribe(x => {
          this.toastr.success('Movie updated', "Success", {
            closeButton: true, timeOut: 5000
          });
          this.router.navigate(['/movies']);
        }, err => {
          this.toastr.error('An unexpected error while updating the record!',
            'ERROR', { closeButton: true, timeOut:10000 })
        })
    }
  }

  uploadImage() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    this.imagesService.upload(this.movie.id, nativeElement.files[0]).subscribe(
      
      image => {
        this.photos.push(image);
      }
    );
    this.toastr.success('Image uploaded', 'Success', { closeButton: true, timeOut:5000 })
  }

}
