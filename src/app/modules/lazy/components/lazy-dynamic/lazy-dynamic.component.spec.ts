import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MLazyDynamicComponent } from './lazy-dynamic.component';

describe('LazyDynamicComponent', () => {
  let component: MLazyDynamicComponent;
  let fixture: ComponentFixture<MLazyDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MLazyDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MLazyDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
