import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishModalComponent } from './publish-modal.component';

describe('PublishModalComponent', () => {
  let component: PublishModalComponent;
  let fixture: ComponentFixture<PublishModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishModalComponent]
    });
    fixture = TestBed.createComponent(PublishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
