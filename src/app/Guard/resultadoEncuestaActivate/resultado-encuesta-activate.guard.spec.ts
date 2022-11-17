import { TestBed } from '@angular/core/testing';

import { ResultadoEncuestaActivateGuard } from './resultado-encuesta-activate.guard';

describe('ResultadoEncuestaActivateGuard', () => {
  let guard: ResultadoEncuestaActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResultadoEncuestaActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
