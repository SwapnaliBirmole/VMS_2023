import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAuditComponent } from './media-audit.component';

describe('MediaAuditComponent', () => {
  let component: MediaAuditComponent;
  let fixture: ComponentFixture<MediaAuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaAuditComponent]
    });
    fixture = TestBed.createComponent(MediaAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
