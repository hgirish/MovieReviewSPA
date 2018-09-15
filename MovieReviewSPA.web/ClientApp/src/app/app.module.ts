import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MoviesComponent } from './components/movies/movies.component';
import { AppRoutingModule } from './/app-routing.module';
import { NewMovieComponent } from './components/new-movie/new-movie.component';
import { ToastrModule } from 'ngx-toastr'
import * as Raven from 'raven-js';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { NewReviewComponent } from './components/new-review/new-review.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { PaginationComponent } from './utilities/pagination/pagination.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthService } from './auth/auth.service';

Raven
  .config('https://c5c060c5de2548d3a53e66a23e7a75ed@sentry.io/1278862')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    Raven.captureException(err);
  }
}
export class ConsoleErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    console.error(err);
  }
}
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MoviesComponent,
    NewMovieComponent,
    EditMovieComponent,
    ReviewsComponent,
    NewReviewComponent,
    EditReviewComponent,
    PaginationComponent,
    DetailViewComponent,
    CallbackComponent,    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule, 
    AppRoutingModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ConsoleErrorHandler },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
