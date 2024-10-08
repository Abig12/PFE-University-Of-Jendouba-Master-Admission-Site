import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalGridComponent } from './eval-grid.component';

describe('EvalGridComponent', () => {
  let component: EvalGridComponent;
  let fixture: ComponentFixture<EvalGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
