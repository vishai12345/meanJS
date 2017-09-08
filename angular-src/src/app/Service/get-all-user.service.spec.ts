import { TestBed, inject } from '@angular/core/testing';

import { GetAllUserService } from './get-all-user.service';

describe('GetAllUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetAllUserService]
    });
  });

  it('should be created', inject([GetAllUserService], (service: GetAllUserService) => {
    expect(service).toBeTruthy();
  }));
});
