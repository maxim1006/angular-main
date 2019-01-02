import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MComponentAsDirectiveComponent } from './component-as-directive.component';

describe('MComponentAsDirectiveComponent', () => {
  let component: MComponentAsDirectiveComponent;
  let fixture: ComponentFixture<MComponentAsDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MComponentAsDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MComponentAsDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
