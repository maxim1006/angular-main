import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkEffectiveTipeComponent } from './network-effective-tipe.component';

describe('NetworkEffectiveTipeComponent', () => {
  let component: NetworkEffectiveTipeComponent;
  let fixture: ComponentFixture<NetworkEffectiveTipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkEffectiveTipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkEffectiveTipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
