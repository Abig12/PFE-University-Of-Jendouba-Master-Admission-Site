import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCandfileComponent } from './agent-candfile.component';

describe('AgentCandfileComponent', () => {
  let component: AgentCandfileComponent;
  let fixture: ComponentFixture<AgentCandfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentCandfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentCandfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
