import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('MoviesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule,ToastrModule.forRoot()],
    providers: [{provide:'BASE_URL',useValue:''}]
  }));

  it('should be created', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    expect(service).toBeTruthy();
  });
});
