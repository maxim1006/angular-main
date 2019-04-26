import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InheritanceCompositionComponent } from './inheritance-composition.component';

describe('InheritanceCompositionComponent', () => {
  let component: InheritanceCompositionComponent;
  let fixture: ComponentFixture<InheritanceCompositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InheritanceCompositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InheritanceCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
