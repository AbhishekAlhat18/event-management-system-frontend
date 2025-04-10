import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerOnboardingComponent } from './organizer-onboarding.component';

describe('OrganizerOnboardingComponent', () => {
  let component: OrganizerOnboardingComponent;
  let fixture: ComponentFixture<OrganizerOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizerOnboardingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
