import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaClearanceComponent } from './media-clearance.component';

describe('MediaClearanceComponent', () => {
  let component: MediaClearanceComponent;
  let fixture: ComponentFixture<MediaClearanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaClearanceComponent]
    });
    fixture = TestBed.createComponent(MediaClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
