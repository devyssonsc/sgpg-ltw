import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncAdminPanelComponent } from './func-admin-panel.component';

describe('FuncAdminPanelComponent', () => {
  let component: FuncAdminPanelComponent;
  let fixture: ComponentFixture<FuncAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncAdminPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
