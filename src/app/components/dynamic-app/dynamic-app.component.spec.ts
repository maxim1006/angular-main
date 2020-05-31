import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MDynamicAppComponent } from "./dynamic-app.component";

describe("MDynamicAppComponent", () => {
    let component: MDynamicAppComponent;
    let fixture: ComponentFixture<MDynamicAppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MDynamicAppComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MDynamicAppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
