import { TestBed, inject } from '@angular/core/testing';

import { MultiplayerService } from './multiplayer.service';

describe('MultiplayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultiplayerService]
    });
  });

  it('should be created', inject([MultiplayerService], (service: MultiplayerService) => {
    expect(service).toBeTruthy();
  }));
});
