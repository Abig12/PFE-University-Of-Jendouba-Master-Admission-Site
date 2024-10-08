import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandMasComponent } from './cand-mas.component';

describe('CandMasComponent', () => {
  let component: CandMasComponent;
  let fixture: ComponentFixture<CandMasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandMasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
