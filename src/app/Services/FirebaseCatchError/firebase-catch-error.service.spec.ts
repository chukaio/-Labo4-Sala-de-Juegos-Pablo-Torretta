import { TestBed } from '@angular/core/testing';

import { FirebaseCatchErrorService } from './firebase-catch-error.service';

describe('FirebaseCatchErrorService', () => {
  let service: FirebaseCatchErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseCatchErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
