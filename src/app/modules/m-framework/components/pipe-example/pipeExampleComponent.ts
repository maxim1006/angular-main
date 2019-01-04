import { Component } from '@angular/core';
import {from, Observable, of} from 'rxjs/index';
import {FileSizePipe} from '../../../shared/pipes/filesize.pipe';


// могу указывать FileSizePipe как провайдер и инжектить в компонент
@Component({
    selector: 'pipe-example',
    templateUrl: './pipeExampleComponent.html',
    providers: [FileSizePipe]
})

export class PipeExampleComponent {
    public filterString: string;
    public time: string = new Date().toString();

    files$: Observable<any>;
    filesPipeAsProvider: any[];

    family = [
        {
            name: 'Max',
            age: 29,
            sex: 'male'
        },
        {
            name: 'Aliya',
            age: 30,
            sex: 'female'
        },
        {
            name: 'Anton',
            age: 30,
            sex: 'male'
        }
    ];

    constructor(private fileSizePipe: FileSizePipe) {}

    ngOnInit() {
        this.files$ = of([
            {name: 'file1', size: 24},
            {name: 'file2', size: 48},
            {name: 'file3', size: 96}
        ]);

        this.filesPipeAsProvider = [
            {name: 'file1', size: this.fileSizePipe.transform(24, 'Gb')},
            {name: 'file2', size: this.fileSizePipe.transform(48, 'Gb')},
            {name: 'file3', size: this.fileSizePipe.transform(96, 'Gb')}
        ];
    }
}
