import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSubmissionComponent } from './content-submission.component';

describe('ContentSubmissionComponent', () => {
  let component: ContentSubmissionComponent;
  let fixture: ComponentFixture<ContentSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSubmissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
