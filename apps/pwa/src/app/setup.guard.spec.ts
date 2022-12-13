import { TestBed } from '@angular/core/testing';

import { SetupGuard } from './setup.guard';
import { RouterTestingModule } from "@angular/router/testing";

describe('SetupGuard', () => {
  let guard: SetupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(SetupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
