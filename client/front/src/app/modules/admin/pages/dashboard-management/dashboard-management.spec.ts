import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardManagement } from './dashboard-management';

describe('DashboardManagement', () => {
  let component: DashboardManagement;
  let fixture: ComponentFixture<DashboardManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
