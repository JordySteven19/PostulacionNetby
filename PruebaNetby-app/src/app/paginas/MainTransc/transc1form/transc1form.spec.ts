import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transc1form } from './transc1form';

describe('Transc1form', () => {
  let component: Transc1form;
  let fixture: ComponentFixture<Transc1form>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transc1form]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Transc1form);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
