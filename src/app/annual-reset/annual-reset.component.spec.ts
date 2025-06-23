import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualResetComponent } from './annual-reset.component';

describe('AnnualResetComponent', () => {
  let component: AnnualResetComponent;
  let fixture: ComponentFixture<AnnualResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualResetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
