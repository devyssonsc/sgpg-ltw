import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LssComponent } from './lss.component';

describe('LssComponent', () => {
  let component: LssComponent;
  let fixture: ComponentFixture<LssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
