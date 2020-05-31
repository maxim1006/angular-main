import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InterviewTasksComponent } from "./interview-tasks.component";

describe("InterviewTasksComponent", () => {
    let component: InterviewTasksComponent;
    let fixture: ComponentFixture<InterviewTasksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InterviewTasksComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InterviewTasksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
