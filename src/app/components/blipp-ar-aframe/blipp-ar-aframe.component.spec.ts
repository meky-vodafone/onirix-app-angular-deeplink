import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlippArAframeComponent } from './blipp-ar-aframe.component';

describe('BlippArAframeComponent', () => {
  let component: BlippArAframeComponent;
  let fixture: ComponentFixture<BlippArAframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlippArAframeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlippArAframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
