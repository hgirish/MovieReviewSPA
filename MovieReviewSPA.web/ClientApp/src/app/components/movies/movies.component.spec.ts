import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { MoviesComponent } from './movies.component';
import { FormsModule } from '@angular/forms';
import { Pager } from '../../models/pager';
import { PaginationComponent } from '../../utilities/pagination/pagination.component';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,FormsModule,HttpClientTestingModule,ToastrModule.forRoot()],
      declarations: [MoviesComponent, PaginationComponent],
      providers: [{provide:'BASE_URL',useValue:''},ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });
});


