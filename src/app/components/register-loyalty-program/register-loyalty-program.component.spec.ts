import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoyaltyProgramComponent } from './register-loyalty-program.component';

describe('RegisterLoyaltyProgramComponent', () => {
  let component: RegisterLoyaltyProgramComponent;
  let fixture: ComponentFixture<RegisterLoyaltyProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLoyaltyProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLoyaltyProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
