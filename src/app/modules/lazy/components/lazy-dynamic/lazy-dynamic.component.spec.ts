import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyDynamicComponent } from './lazy-dynamic.component';

describe('LazyDynamicComponent', () => {
  let component: LazyDynamicComponent;
  let fixture: ComponentFixture<LazyDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
