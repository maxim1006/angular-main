import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConsoleExamplesComponent } from "./console-examples.component";

describe("ConsoleExamplesComponent", () => {
    let component: ConsoleExamplesComponent;
    let fixture: ComponentFixture<ConsoleExamplesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConsoleExamplesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConsoleExamplesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
