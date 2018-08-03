import { NgForExampleService } from "./ng-for-example.service";
export declare class NgforExampleComponent {
    private ngForExampleService;
    family: any;
    filterValue: string;
    constructor(ngForExampleService: NgForExampleService);
    ngOnInit(): void;
    addItem(): void;
    trackByFn(index: any, item: any): any;
}
