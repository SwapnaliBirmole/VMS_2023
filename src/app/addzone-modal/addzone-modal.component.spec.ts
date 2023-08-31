import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddzoneModalComponent } from './addzone-modal.component';

describe('AddzoneModalComponent', () => {
  let component: AddzoneModalComponent;
  let fixture: ComponentFixture<AddzoneModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddzoneModalComponent]
    });
    fixture = TestBed.createComponent(AddzoneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
