import {Component, OnInit, Inject} from "@angular/core";
import {HomeService} from "./home.service";

@Component({
    selector: 'm-home',
    templateUrl: 'm-home.component.html'
})
export class MHomeComponent implements OnInit {

    constructor(@Inject('NamedService') private namedService: HomeService) {

    }

    ngOnInit(): void {
        console.log(this.namedService);
    }



}