import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "encapsulation-example",
    templateUrl: "./encapsulationExampleComponent.html",
    // styleUrls: ['./encapsulation-example.css'], //при добавлении этой строки возникают атрибуты типо _ngcontent-qbq-8
    encapsulation: ViewEncapsulation.None, //Native - делает shadow dom, Emulated, None
})
export class EncapsulationExampleComponent {}
