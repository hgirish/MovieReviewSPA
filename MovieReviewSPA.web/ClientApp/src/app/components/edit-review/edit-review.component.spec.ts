import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewComponent } from './edit-review.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('EditReviewComponent', () => {
  let component: EditReviewComponent;
  let fixture: ComponentFixture<EditReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditReviewComponent],
      imports: [FormsModule, RouterTestingModule,HttpClientTestingModule,ToastrModule.forRoot()],
      providers:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
