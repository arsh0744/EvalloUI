import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcDashboardComponent } from './cc-dashboard.component';

describe('CcDashboardComponent', () => {
  let component: CcDashboardComponent;
  let fixture: ComponentFixture<CcDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CcDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CcDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
