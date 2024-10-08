import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEESLayoutComponent } from './admin-ees-layout.component';

describe('AdminEESLayoutComponent', () => {
  let component: AdminEESLayoutComponent;
  let fixture: ComponentFixture<AdminEESLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEESLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEESLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
