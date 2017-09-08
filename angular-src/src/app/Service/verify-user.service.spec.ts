import { TestBed, inject } from '@angular/core/testing';

import { VerifyUserService } from './verify-user.service';

describe('VerifyUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifyUserService]
    });
  });

  it('should be created', inject([VerifyUserService], (service: VerifyUserService) => {
    expect(service).toBeTruthy();
  }));
});
