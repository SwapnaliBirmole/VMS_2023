import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmsmanagementComponent } from './vmsmanagement.component';

describe('VmsmanagementComponent', () => {
  let component: VmsmanagementComponent;
  let fixture: ComponentFixture<VmsmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VmsmanagementComponent]
    });
    fixture = TestBed.createComponent(VmsmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
