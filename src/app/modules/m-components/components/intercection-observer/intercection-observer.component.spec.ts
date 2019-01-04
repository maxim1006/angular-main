import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercectionObserverComponent } from './intercection-observer.component';

describe('IntercectionObserverComponent', () => {
  let component: IntercectionObserverComponent;
  let fixture: ComponentFixture<IntercectionObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntercectionObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntercectionObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
