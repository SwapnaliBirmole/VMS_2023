import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvmsModalComponent } from './addvms-modal.component';

describe('AddvmsModalComponent', () => {
  let component: AddvmsModalComponent;
  let fixture: ComponentFixture<AddvmsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddvmsModalComponent]
    });
    fixture = TestBed.createComponent(AddvmsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
