import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUJLayoutComponent } from './admin-uj-layout.component';

describe('AdminUJLayoutComponent', () => {
  let component: AdminUJLayoutComponent;
  let fixture: ComponentFixture<AdminUJLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUJLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUJLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
