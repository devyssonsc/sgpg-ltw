import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncServPanelComponent } from './func-serv-panel.component';

describe('FuncServPanelComponent', () => {
  let component: FuncServPanelComponent;
  let fixture: ComponentFixture<FuncServPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncServPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncServPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
