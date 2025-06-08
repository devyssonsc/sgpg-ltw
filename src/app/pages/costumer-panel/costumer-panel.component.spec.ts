import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerPanelComponent } from './costumer-panel.component';

describe('CostumerPanelComponent', () => {
  let component: CostumerPanelComponent;
  let fixture: ComponentFixture<CostumerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostumerPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostumerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
