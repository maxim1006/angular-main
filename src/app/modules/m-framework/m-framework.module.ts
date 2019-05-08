import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MFrameworkComponent} from './m-framework.component';
import {ElementLinkComponent} from './components/element-link_viewChild_viewChildren/elementLinkComponent';
import {DataBindingComponent} from './components/data-binding/dataBindingComponent';
import {InnerDataBindingComponent} from './components/data-binding/inner/innerDataBindingComponent';
import {ClassExampleComponent} from './components/class-example/classExampleComponent';
import {AttributeExampleComponent} from './components/attribute-example/attributeExampleComponent';
import {StyleExampleComponent} from './components/style-example/styleExampleComponent';
import {EventExampleComponent} from './components/event-example/eventExampleComponent';
import {EncapsulationExampleComponent} from './components/encapsulation-example/encapsulationExampleComponent';
import {ComponentWithDirectiveComponent, CustomDirective} from './components/component-with-directive/ComponentWithDirectiveComponent';
import {NgforExampleComponent} from './components/ng-for-example/ng-for-example.component';
import {NgforExampleWithObjectComponent} from './components/ng-for-example-with-object/ng-for-example-with-object.component';
import {NgSwitchExampleComponent} from './components/ng-switch-example/ngSwitchExampleComponent';
import {PipeExampleComponent} from './components/pipe-example/pipeExampleComponent';
import {ParentComponent} from './components/parent-component/parentComponent';
import {ChildComponent} from './components/parent-component/child-component/childComponent';
import {ElNativeElementComponent} from './components/el-native-element/el-native-element.component';
import {HostBindingComponent} from './components/host-binding/host-binding.component';
import {SharedModule} from '../shared/shared.module';
import {DetectPropertyChangeComponent} from './components/detect-property-change/detect-property-change.component';
import {TranscludeExampleComponent} from './components/transclude-example/transclude-example.component';
import {InnerTranscludeExampleComponent} from './components/transclude-example/inner-transclude-example.component';
import {CustomChangeDetectionComponent} from './components/custom-change-detection/custom-change-detection.component';
import {CustomChangeDetectionComponentInner} from './components/custom-change-detection/components/custom-change-detection-inner.component';
import {DynamicComponent} from './components/dynamic/dynamic.component';
import {NgIfExampleComponent} from './components/ng-if-example/ng-if-example.component';
import {NgTemplateExampleComponent} from './components/ng-template-example/ngTemplateExampleComponent';
import {MDecoratorsComponent} from './components/m-decorators/m-decorators.component';
import {RouterModule, Routes} from '@angular/router';
import {OutsideDynamicTemplateComponent} from './components/outside-dynamic-template/outside-dynamic-template';
import {RendererExampleComponent} from './components/renderer-example/renderer-example.component';
import {TranscludeDirective} from './directives/transclude.directive';
import {MColoryDirective} from './directives/colory.directive';
import {MDirectiveExampleComponent} from './components/directive-example/directive-example.component';
import {CustomStructuralDirective} from './directives/custom-structural.directive';
import {CustomStructuralDirectiveComponent} from './components/custom-structure-directive/custom-structural-directive.component';
import {DynamicHostDirective} from './components/dynamic/dynamic-host.directive';
import {MAnimationsComponent} from './components/animations/animationa.component';
import {TooltipDirective} from './directives/tooltip.directive';
import {MyForDirective} from './directives/my-for.directive';
import {MComponentAsDirectiveComponent} from './components/component-as-directive/component-as-directive.component';
import {OutputListenersComponent} from './components/output-listeners/output-listeners.component';
import {RunLazyRuntimeComponent} from './components/run-lazy-runtime/run-lazy-runtime.component';
import {LazyModule} from '@herodevs/lazy-af';
import {TextareaTestComponent} from './components/textarea-test/textarea-test.component';
import {LazyRuntimeModuleService} from './services/lazy-module.service';

const routes: Routes = [
    {path: '', component: MFrameworkComponent},
];

@NgModule({
    imports: [
        SharedModule,
        HttpModule,
        FormsModule,
        LazyModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        MColoryDirective,
        CustomStructuralDirective,
        CustomStructuralDirectiveComponent,
        MDirectiveExampleComponent,
        MFrameworkComponent,
        ElementLinkComponent,
        DataBindingComponent,
        InnerDataBindingComponent,
        ClassExampleComponent,
        AttributeExampleComponent,
        StyleExampleComponent,
        EventExampleComponent,
        EncapsulationExampleComponent,
        ComponentWithDirectiveComponent,
        NgforExampleComponent,
        NgforExampleWithObjectComponent,
        NgSwitchExampleComponent,
        PipeExampleComponent,
        TranscludeExampleComponent,
        InnerTranscludeExampleComponent,
        ParentComponent,
        ChildComponent,
        DynamicComponent,
        ElNativeElementComponent,
        HostBindingComponent,
        CustomDirective,
        DetectPropertyChangeComponent,
        CustomChangeDetectionComponent,
        CustomChangeDetectionComponentInner,
        NgIfExampleComponent,
        NgTemplateExampleComponent,
        MDecoratorsComponent,
        OutsideDynamicTemplateComponent,
        RendererExampleComponent,
        TranscludeDirective,
        DynamicHostDirective,
        MAnimationsComponent,
        TooltipDirective,
        MyForDirective,
        MComponentAsDirectiveComponent,
        OutputListenersComponent,
        RunLazyRuntimeComponent,
        TextareaTestComponent,
    ],
    exports: [MFrameworkComponent, ClassExampleComponent, DynamicComponent],
    providers: [LazyRuntimeModuleService],
    entryComponents: [ClassExampleComponent, MDirectiveExampleComponent]
})
export class MFrameworkModule {
}
