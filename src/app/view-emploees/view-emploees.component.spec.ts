import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmploeesComponent } from './view-emploees.component';

describe('ViewEmploeesComponent', () => {
  let component: ViewEmploeesComponent;
  let fixture: ComponentFixture<ViewEmploeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewEmploeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEmploeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
