import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prod1 } from './prod1';

describe('Prod1', () => {
  let component: Prod1;
  let fixture: ComponentFixture<Prod1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Prod1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prod1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
