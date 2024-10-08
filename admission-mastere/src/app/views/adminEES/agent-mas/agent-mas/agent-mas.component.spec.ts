import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMasComponent } from './agent-mas.component';

describe('AgentMasComponent', () => {
  let component: AgentMasComponent;
  let fixture: ComponentFixture<AgentMasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentMasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
