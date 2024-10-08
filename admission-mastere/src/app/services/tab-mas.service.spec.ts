import { TestBed } from '@angular/core/testing';

import { TabMasService } from './tab-mas.service';

describe('TabMasService', () => {
  let service: TabMasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabMasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
