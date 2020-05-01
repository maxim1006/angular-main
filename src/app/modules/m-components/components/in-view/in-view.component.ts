import {Component, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import inViewHelper from './in-view.helper';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'm-in-view',
    template: `
        <h3>In view with Intersection oberver</h3>
        <div class="m-in-view__inner">
            <div class="m-in-view__block"></div>
            <div class="m-in-view__block">
                Intersected element
                <div class="m-in-view__intersection" #intersectionElement></div>
            </div>
            <div class="m-in-view__block"></div>
        </div>
    `,
    styles: [
            `
            .m-in-view {
                display: block;
            }

            .m-in-view__inner {
                width: 400px;
                height: 300px;
                border: 1px solid;
                overflow: auto;
            }

            .m-in-view__block {
                height: 400px;
            }
        `
    ]
})

export class MInViewComponent implements OnInit, OnDestroy {
    @HostBinding('class.m-in-view') true;

    @ViewChild('intersectionElement', {static: true}) intersectionElement;

    private destroy$ = new Subject();

    ngOnInit() {
        inViewHelper(this.intersectionElement.nativeElement)
            .pipe(takeUntil(this.destroy$))
            .subscribe((isInView: boolean) => {
                console.log("intersectionElement ", isInView);
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
