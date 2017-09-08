import { TestBed, inject } from '@angular/core/testing';

import { EditProfileServiceService } from './edit-profile-service.service';

describe('EditProfileServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditProfileServiceService]
    });
  });

  it('should be created', inject([EditProfileServiceService], (service: EditProfileServiceService) => {
    expect(service).toBeTruthy();
  }));
});
