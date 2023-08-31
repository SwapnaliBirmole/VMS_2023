import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCreationModalComponent } from './playlist-creation-modal.component';

describe('PlaylistCreationModalComponent', () => {
  let component: PlaylistCreationModalComponent;
  let fixture: ComponentFixture<PlaylistCreationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistCreationModalComponent]
    });
    fixture = TestBed.createComponent(PlaylistCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
