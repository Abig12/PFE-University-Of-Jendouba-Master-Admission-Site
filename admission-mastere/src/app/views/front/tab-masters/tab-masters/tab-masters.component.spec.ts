import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMastersComponent } from './tab-masters.component';

describe('TabMastersComponent', () => {
  let component: TabMastersComponent;
  let fixture: ComponentFixture<TabMastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabMastersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
