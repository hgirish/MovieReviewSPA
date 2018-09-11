import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { EditMovieComponent } from './edit-movie.component';
import { FormsModule } from '@angular/forms';
import {RouterTestingModule } from '@angular/router/testing'
import { ToastrService, ToastrModule } from 'ngx-toastr';
describe('EditMovieComponent', () => {
  let component: EditMovieComponent;
  let fixture: ComponentFixture<EditMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule,HttpClientTestingModule,ToastrModule.forRoot()],
      declarations: [EditMovieComponent],
      providers: [{ provide: 'BASE_URL', useValue: '' }, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
