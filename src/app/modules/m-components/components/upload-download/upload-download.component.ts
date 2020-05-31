import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { domenToken } from "../../../shared/tokens/tokens";
import { isPlatformBrowser } from "@angular/common";

@Component({
    selector: "m-upload-download",
    template: `
        <input placeholder="name" type="text" (input)="onNameInput($event)" />
        <input placeholder="age" type="text" (input)="onAgeInput($event)" />
        <button (click)="download()">Download</button>
        <p></p>
        <input type="file" (change)="handleFiles($event)" />
        <p>Uploaded json: {{ uploadedJson }}</p>

        <p>Uplad image</p>
        <input
            #inputFiles
            type="file"
            id="fileElem"
            multiple
            accept="image/*"
            style="display:none"
            (change)="upload($event)"
        />
        <a
            href="#"
            (click)="$event.preventDefault(); inputFiles.click()"
            id="fileSelect"
            >Upload images</a
        >
        <div id="fileList">
            <p *ngIf="emptyFilesMessageVisible">No files selected!</p>
        </div>

        <h3>Multer upload</h3>
        <form
            action="/"
            method="post"
            enctype="multipart/form-data"
            (submit)="_submit($event, fileInput)"
        >
            <label>Файл</label><br />
            <input
                type="file"
                name="filedata"
                #fileInput
                multiple
            /><br /><br />
            <input type="submit" value="Send" />
        </form>
    `,
})
export class MUploadDownloadComponent {
    items = {
        name: "",
        age: "",
    };

    uploadedJson: string;
    emptyFilesMessageVisible = "Choose files";

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Record<string, any>
    ) {}

    onNameInput(event) {
        this.items.name = event.target.value;
    }

    onAgeInput(event) {
        this.items.age = event.target.value;
    }

    handleFiles(event) {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = data => {
            this.uploadedJson = data.target.result as string;
        };

        reader.readAsText(file);
    }

    download(): void {
        this.saveTextAsFile(
            JSON.stringify(this.items),
            "items.json",
            "text/plain"
        );
    }

    saveTextAsFile(content, filename, contentType) {
        const link = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        link.href = URL.createObjectURL(file);
        link.download = filename;
        link.click();
    }

    upload(event) {
        if (isPlatformBrowser(this.platformId)) {
            window.URL = window.URL || window["webkitURL"];

            const files = event.target.files;

            this.emptyFilesMessageVisible = files.length;

            const fileList = document.querySelector("#fileList");

            fileList.innerHTML = "";
            fileList.appendChild(document.createElement("ul"));

            if (files.length) {
                for (let i = 0; i < files.length; i++) {
                    const img = document.createElement("img");
                    img.src = window.URL.createObjectURL(files[i]);
                    img.height = 150;
                    img.onload = function () {
                        window.URL.revokeObjectURL(img.src);
                    };

                    const listItem = document.createElement("li");
                    const listItemInfo = document.createElement("span");

                    listItemInfo.innerHTML =
                        files[i].name + ": " + files[i].size + " bytes";

                    listItem.appendChild(img);
                    listItem.appendChild(listItemInfo);
                    fileList.appendChild(listItem);
                }
            }
        }
    }

    _submit(e, fileInput) {
        e.preventDefault();

        const formData: FormData = new FormData();

        for (const file of fileInput.files) {
            formData.append("fileData", file, file.name);
        }

        this.http.post(`${domenToken}api/upload`, formData).subscribe(data => {
            console.log(data);
        });
    }
}
