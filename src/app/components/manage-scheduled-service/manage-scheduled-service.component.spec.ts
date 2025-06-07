import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageScheduledServiceComponent } from './manage-scheduled-service.component';

describe('ManageScheduledServiceComponent', () => {
  let component: ManageScheduledServiceComponent;
  let fixture: ComponentFixture<ManageScheduledServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageScheduledServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageScheduledServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
