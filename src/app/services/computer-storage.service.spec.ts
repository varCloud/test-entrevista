import { TestBed } from '@angular/core/testing';

import { ComputerStorageService } from './computer-storage.service';

describe('ComputerStorageService', () => {
  let service: ComputerStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComputerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
