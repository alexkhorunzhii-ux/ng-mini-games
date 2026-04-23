import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlitzComponent } from './blitz.component';

describe('BlitzComponent', () => {
  let component: BlitzComponent;
  let fixture: ComponentFixture<BlitzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlitzComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlitzComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
