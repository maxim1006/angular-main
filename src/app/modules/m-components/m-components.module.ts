import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MComponentsComponent} from './m-components.component';
import {MAutocompleteComponent} from './components/m-autocomplete/m-autocomplete.component';
import {ContentEditableComponent} from './components/content-editable/content-editable.component';
import {SharedModule} from '../shared/shared.module';
import {MTreeComponent} from './components/m-tree/m-tree.component';
import {MEllipsisComponent} from './components/m-ellipsis/m-ellipsis.component';
import {MSelectComponent} from './components/m-select/m-select.component';
import {MScrollComponent} from './components/m-scroll/m-scroll.component';
import {MCheckboxComponent} from './components/m-checkbox/m-checkbox.component';
import {MediaQueryComponent} from './components/media-query/media-query.component';
import {HammerExampleComponent} from './components/hammer-example/hammer-example.component';
import {MDynamicComponent} from './components/m-dynamic/m-dynamic.component';
import {MButtonComponent} from './components/m-button/m-button.component';
import {RouterModule, Routes} from '@angular/router';
import {MGraphComponent} from './components/m-graph/m-graph.component';
import {MGraphWrapperComponent} from './components/m-graph/wrapper/m-graph-wrapper.component';
import {MSparklineGraphComponent} from './components/m-graph/sparkline/m-sparkline-graph.component';
import {MSlideToggleComponent} from './components/slide-toggle/slide-toggle.component';
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';
import {MGridExampleComponent} from './components/grid-example/grid-example.component';
import {MGridComponent} from './components/grid/grid.component';
import { IntercectionObserverComponent } from './components/intercection-observer/intercection-observer.component';
import { AsyncAwaitComponent } from './components/async-await/async-await.component';
import { KeydownComponent } from './components/keydown/keydown.component';
import {ConsoleExamplesComponent} from './components/console-examples/console-examples.component';
import { LinkBlankComponent } from './components/link-blank/link-blank.component';
import { NetworkEffectiveTipeComponent } from './components/network-effective-tipe/network-effective-tipe.component';
import { InheritanceCompositionComponent } from './components/inheritance-composition/inheritance-composition.component';
import { DebounceComponent } from './components/debounce/debounce.component';
import { InterviewTasksComponent } from './components/interview-tasks/interview-tasks.component';
import { ThrottleComponent } from './components/throttle/throttle.component';
import { MapComponent } from './components/map/map.component';
import {SmoothScrollComponent} from './components/smooth-scroll/smooth-scroll.component';
import {MUploadDownloadComponent} from './components/upload-download/upload-download.component';
import {MSvgComponent} from './components/svg/svg.component';

const routes: Routes = [
    {path: '', component: MComponentsComponent},
];

const components = [
    MDynamicComponent,
    MComponentsComponent,
    MAutocompleteComponent,
    MSelectComponent,
    MTreeComponent,
    ContentEditableComponent,
    MEllipsisComponent,
    MScrollComponent,
    MCheckboxComponent,
    MediaQueryComponent,
    HammerExampleComponent,
    MButtonComponent,
    MGraphComponent,
    MSparklineGraphComponent,
    MGraphWrapperComponent,
    MSlideToggleComponent,
    ProgressBarComponent,
    MGridComponent,
    InterviewTasksComponent,
    MUploadDownloadComponent,
    MSvgComponent,
];

const directives = [
];



@NgModule({
    imports: [SharedModule, HttpClientModule, FormsModule, RouterModule.forChild(routes)],
    declarations: [
        ...components, ...directives, MGridExampleComponent, IntercectionObserverComponent, AsyncAwaitComponent, KeydownComponent, ConsoleExamplesComponent, LinkBlankComponent, NetworkEffectiveTipeComponent, InheritanceCompositionComponent, DebounceComponent, ThrottleComponent, MapComponent, SmoothScrollComponent
    ],
    exports: [MComponentsComponent],
    entryComponents: [...components],
    providers: []
})


export class MComponentsModule {
}
