import {NgModule} from "@angular/core";
import {SimpleLogDirective} from "./directives/simple-log/simpleLogDirective";
import {ClickOutsideDirective} from "./directives/click-outside/clickOutsideDirective";
import {CustomPipe} from "./pipes/customPipe";
import {objToArrPipe} from "./pipes/objToArrPipe";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ContentEditableDirective} from "./directives/content-editable/content-editable.directive";
import {CommonModule} from "@angular/common";
import {EllipsisDirective} from "./directives/ellipsis/ellipsis.directive";
import {SlideToggleDirective} from "./directives/slide-toggle/slide-toggle.directive";
import {MLoaderComponent} from "./components/m-loader/m-loader.component";
import {ImpurePipe} from "./pipes/impure.pipe";

@NgModule({
    imports: [CommonModule],
    exports: [
        CommonModule,

        /*Directive*/
        SimpleLogDirective,
        ClickOutsideDirective,
        ContentEditableDirective,
        EllipsisDirective,
        SlideToggleDirective,

        /*Components*/
        MLoaderComponent,

        /*Pipes*/
        CustomPipe,
        ImpurePipe,
        objToArrPipe
    ],
    declarations: [
        /*Components*/
        PageNotFoundComponent,
        MLoaderComponent,

        /*Directive*/
        SimpleLogDirective,
        ClickOutsideDirective,
        ContentEditableDirective,
        EllipsisDirective,
        SlideToggleDirective,

        /*Pipes*/
        CustomPipe,
        ImpurePipe,
        objToArrPipe
    ]
})
export class SharedModule {}
