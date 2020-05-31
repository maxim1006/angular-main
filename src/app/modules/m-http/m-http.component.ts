import { Component, OnInit, Inject } from "@angular/core";
import { MHttpService } from "./m-http.service";
import { NewService } from "./new.service";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";

export class FamilyMember {
    name: string;
    age: number;
    sex: string;
}

export class UploadedFile {
    name: string;
    size: number;
}

@Component({
    selector: "m-http",
    templateUrl: "./m-http.component.html",
})
export class MHttpComponent implements OnInit {
    public progress: string;
    public isLoading: boolean;
    public uploadedFiles: UploadedFile[] = [];

    public family$: Observable<FamilyMember[]>;
    public dataById$: Observable<number>;
    public postData$: Observable<FamilyMember>;

    constructor(
        @Inject("KEY1") private key1: string,
        @Inject("KEY2") private key2: string,
        private mHttpService: MHttpService,
        @Inject("Value") private _value: string,
        private _newService: NewService
    ) {}

    ngOnInit() {
        // при каждом | async будет subscribe и будет вызов, а при shareReplay(1) - вызовется 1 раз и всем
        // последующим сабскрайберам раздаст последний результат, удобно использовать если в шаблоне
        // много | async и трудно сделать через ng-container
        // Еще можно создать компонент обертку и внутрь него сложный код положить
        this.family$ = this.mHttpService.getData().pipe(shareReplay(1));

        this.dataById$ = this.mHttpService.getDataById();
        this.postData$ = this.mHttpService.postData({
            name: "Anna",
            age: 0,
        });
    }

    uploadButtonClick() {
        this.uploadedFiles = [];
    }

    attachFiles(files: any) {
        if (!files) {
            return;
        }

        const formData = new FormData();

        if (files.length > 0) {
            // a file was selected
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
        }

        this.isLoading = true;

        this.mHttpService.postFile(formData).subscribe(data => {
            console.log(data);
        });

        // upload.progress.subscribe((progress: number) => {
        //      this.progress = progress + '%';
        // });
        //
        // upload.response.subscribe(() => {
        //     console.log('complete');
        //     for (let i = 0; i < files.length; i++) {
        //         this.uploadedFiles.push({
        //            name: files[i].name,
        //            size: files[i].size
        //         });
        //     }
        //
        //     this.isLoading = false;
        //     this.progress = null;
        // });
    }
}

const KEY1 = 1;
const KEY2 = 2;

export const httpInjectables: any[] = [
    { provide: "KEY1", useValue: KEY1 },
    { provide: "KEY2", useValue: KEY2 },
    { provide: "Value", useValue: "Value" },
];
