import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAppComponent } from './dynamic-app.component';

describe('DynamicAppComponent', () => {
  let component: DynamicAppComponent;
  let fixture: ComponentFixture<DynamicAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
