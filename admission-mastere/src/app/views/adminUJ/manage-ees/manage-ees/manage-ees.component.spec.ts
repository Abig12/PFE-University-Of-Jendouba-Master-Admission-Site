import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEESComponent } from './manage-ees.component';

describe('ManageEESComponent', () => {
  let component: ManageEESComponent;
  let fixture: ComponentFixture<ManageEESComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEESComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
