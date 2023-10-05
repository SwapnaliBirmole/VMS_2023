import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaStatusComponent } from './media-status.component';

describe('MediaStatusComponent', () => {
  let component: MediaStatusComponent;
  let fixture: ComponentFixture<MediaStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaStatusComponent]
    });
    fixture = TestBed.createComponent(MediaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
