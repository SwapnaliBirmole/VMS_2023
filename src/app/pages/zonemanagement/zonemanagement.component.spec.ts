import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonemanagementComponent } from './zonemanagement.component';

describe('ZonemanagementComponent', () => {
  let component: ZonemanagementComponent;
  let fixture: ComponentFixture<ZonemanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZonemanagementComponent]
    });
    fixture = TestBed.createComponent(ZonemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
