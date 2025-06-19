import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transc1 } from './transc1';

describe('Transc1', () => {
  let component: Transc1;
  let fixture: ComponentFixture<Transc1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transc1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Transc1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
