import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasCandidacyComponent } from './mas-candidacy.component';

describe('MasCandidacyComponent', () => {
  let component: MasCandidacyComponent;
  let fixture: ComponentFixture<MasCandidacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasCandidacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasCandidacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
