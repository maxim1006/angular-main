import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputListenersComponent } from './output-listeners.component';

describe('OutputListenersComponent', () => {
  let component: OutputListenersComponent;
  let fixture: ComponentFixture<OutputListenersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputListenersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputListenersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
