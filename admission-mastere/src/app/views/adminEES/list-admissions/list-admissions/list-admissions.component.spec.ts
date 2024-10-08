import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdmissionsComponent } from './list-admissions.component';

describe('ListAdmissionsComponent', () => {
  let component: ListAdmissionsComponent;
  let fixture: ComponentFixture<ListAdmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAdmissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAdmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
