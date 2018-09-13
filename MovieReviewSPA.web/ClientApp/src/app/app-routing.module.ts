import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NewMovieComponent } from './components/new-movie/new-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { NewReviewComponent } from './components/new-review/new-review.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/new', component: NewMovieComponent },
  { path: 'movies/:id', component: EditMovieComponent },
  { path: 'movies/detail/:id', component: DetailViewComponent },
  { path: 'reviews/:id', component: ReviewsComponent },
  { path: 'reviews/new/:id', component: NewReviewComponent },
  { path: 'reviews/edit/:id', component:EditReviewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: '**', redirectTo: 'movies' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
