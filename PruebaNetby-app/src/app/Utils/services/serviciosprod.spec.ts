import { TestBed } from '@angular/core/testing';

import { Serviciosprod } from './serviciosprod';

describe('Serviciosprod', () => {
  let service: Serviciosprod;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serviciosprod);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
