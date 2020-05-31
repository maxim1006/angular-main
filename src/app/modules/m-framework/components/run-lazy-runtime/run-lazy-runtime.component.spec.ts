import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RunLazyRuntimeComponent } from "./run-lazy-runtime.component";

describe("RunLazyRuntimeComponent", () => {
    let component: RunLazyRuntimeComponent;
    let fixture: ComponentFixture<RunLazyRuntimeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RunLazyRuntimeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RunLazyRuntimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
