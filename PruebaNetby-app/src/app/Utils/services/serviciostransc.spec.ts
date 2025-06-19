import { TestBed } from '@angular/core/testing';

import { Serviciostransc } from './serviciostransc';

describe('Serviciostransc', () => {
  let service: Serviciostransc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serviciostransc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
