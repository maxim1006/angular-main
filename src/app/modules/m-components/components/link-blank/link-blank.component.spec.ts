import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LinkBlankComponent } from "./link-blank.component";

describe("LinkBlankComponent", () => {
    let component: LinkBlankComponent;
    let fixture: ComponentFixture<LinkBlankComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LinkBlankComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LinkBlankComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
