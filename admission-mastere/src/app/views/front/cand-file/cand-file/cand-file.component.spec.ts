import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandFileComponent } from './cand-file.component';

describe('CandFileComponent', () => {
  let component: CandFileComponent;
  let fixture: ComponentFixture<CandFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
