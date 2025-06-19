import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prod1form } from './prod1form';

describe('Prod1form', () => {
  let component: Prod1form;
  let fixture: ComponentFixture<Prod1form>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prod1form]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prod1form);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
