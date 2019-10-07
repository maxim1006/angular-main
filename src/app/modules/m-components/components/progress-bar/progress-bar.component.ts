import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
    selector: 'progress-bar',
    template: `
        <div class="progress-bar__content">
            <div class="progress-bar__line">
                <div class="progress-bar__line-inner" 
                     #progressBarLineInner
                     [ngStyle]="{
                        'transitionDuration': animationSpeed + 'ms',
                        'left': (value || 0) + '%'
                     }"
                ></div>
            </div>
            <div class="progress-bar__text"
                 *ngIf="text"
            >{{text}}</div>
        </div>
    `,
    host: {
        '[class.progress-bar]': 'true'
    }
})

export class ProgressBarComponent {

    @ViewChild('progressBarLineInner', {static: false})
    private line: ElementRef;


    @Input()
    public set value(value: number) {
        this.updateCurrentAnimationSpeed();
        this._value = value;
    }

    public get value() {
        return this._value;
    }

    @Input()
    public animationSpeed = 300;

    @Input()
    public text: string;


    private _value: number;

    private updateCurrentAnimationSpeed(): void {
        let self = this,
            line;

        if (self.line && self.line.nativeElement) {
            line = self.line.nativeElement;

            line.style.transitionDuration = self.animationSpeed;
        }
    }
}
