import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';

describe('GlobalErrorService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
