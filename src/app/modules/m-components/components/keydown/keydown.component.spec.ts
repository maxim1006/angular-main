import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { KeydownComponent } from "./keydown.component";

describe("KeydownComponent", () => {
    let component: KeydownComponent;
    let fixture: ComponentFixture<KeydownComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KeydownComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KeydownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
