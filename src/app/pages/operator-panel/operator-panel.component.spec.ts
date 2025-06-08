import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorPanelComponent } from './operator-panel.component';

describe('OperatorPanelComponent', () => {
  let component: OperatorPanelComponent;
  let fixture: ComponentFixture<OperatorPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
