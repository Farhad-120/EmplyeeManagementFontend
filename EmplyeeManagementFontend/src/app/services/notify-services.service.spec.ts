import { TestBed } from '@angular/core/testing';

import { NotifyServicesService } from './notify-services.service';

describe('NotifyServicesService', () => {
  let service: NotifyServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
