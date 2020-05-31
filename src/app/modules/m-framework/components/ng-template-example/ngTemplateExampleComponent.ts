import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Directive,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from "@angular/core";
import { MTemplateExampleDirective } from "./template-example.directive";

@Component({
    selector: "ng-template-example",
    templateUrl: "./ngTemplateExampleComponent.html",
})
export class NgTemplateExampleComponent implements AfterViewInit {
    public constructor(private cdr: ChangeDetectorRef) {}

    @ViewChild("tmpl")
    public _tmpl: TemplateRef<any>;

    @ViewChild("someDiv", { read: ViewContainerRef })
    public _someDiv: ViewContainerRef;

    @ViewChild("templateExampleDirectiveContainer", { read: ViewContainerRef })
    public _templateExampleDirectiveContainer: ViewContainerRef;

    @ViewChild(MTemplateExampleDirective)
    public _mTemplateExampleDirective: MTemplateExampleDirective;

    ngAfterViewInit() {
        // this._tmpl встанет сразу после this._someDiv
        this._someDiv.createEmbeddedView(this._tmpl, {
            $implicit: "Max", // указав $implicit могу сделать любой let-что-то и это что-то будет implicit, например <ng-template #t
            // mpl let-name> тут hame будет равно Max несмотря на то что явно его не указал
            city: "Moscow",
        });

        // кастомно вставляю темплейт в див, а сам темлейт получаю из директивы
        this._templateExampleDirectiveContainer.createEmbeddedView(
            this._mTemplateExampleDirective.template,
            {
                $implicit: {
                    prop: "Hello from implicit",
                },
            }
        );

        this.cdr.detectChanges();
    }
}
