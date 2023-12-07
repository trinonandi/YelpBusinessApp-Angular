import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailsCardComponent } from './business-details-card.component';

describe('BusinessDetailsCardComponent', () => {
  let component: BusinessDetailsCardComponent;
  let fixture: ComponentFixture<BusinessDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDetailsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
