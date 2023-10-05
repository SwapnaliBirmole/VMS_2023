import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishOperationComponent } from './publish-operation.component';

describe('PublishOperationComponent', () => {
  let component: PublishOperationComponent;
  let fixture: ComponentFixture<PublishOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishOperationComponent]
    });
    fixture = TestBed.createComponent(PublishOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
