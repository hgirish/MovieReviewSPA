import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReviewComponent } from './new-review.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('NewReviewComponent', () => {
  let component: NewReviewComponent;
  let fixture: ComponentFixture<NewReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewReviewComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule,ToastrModule.forRoot()],
      providers: [{ provide: 'BASE_URL', useValue: ''}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
