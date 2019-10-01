import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'm-upload-download',
    template: `
        <input placeholder="name" type="text" (input)="onNameInput($event)">
        <input placeholder="age" type="text" (input)="onAgeInput($event)">
        <button (click)="download()">Download</button>
        <p></p>
        <input type="file" (change)="handleFiles($event)">
        <p>Uploaded json: {{uploadedJson}}</p>
        
        <p>Uplad image</p>
        <input #inputFiles type="file" id="fileElem" multiple accept="image/*" style="display:none" (change)="handleImages($event)">
        <a href="#" (click)="$event.preventDefault(); inputFiles.click()" id="fileSelect">Upload images</a>
        <div id="fileList">
            <p *ngIf="emptyFilesMessageVisible">No files selected!</p>
        </div>
    `
})

export class MUploadDownloadComponent {
    items = {
        name: '',
        age: ''
    };

    uploadedJson: string;
    emptyFilesMessageVisible = 'Choose files';

    onNameInput(event) {
        this.items.name = event.target.value;
    }

    onAgeInput(event) {
        this.items.age = event.target.value;
    }

    handleFiles(event) {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = (data) => {
            this.uploadedJson = (data.target as FileReader).result as string;
        };

        reader.readAsText(file);
    }

    download(): void {
        this.saveTextAsFile(JSON.stringify(this.items), 'items.json', 'text/plain');
    }

    saveTextAsFile(content, filename, contentType) {
        const link = document.createElement('a');
        const file = new Blob([content], {type: contentType});
        link.href = URL.createObjectURL(file);
        link.download = filename;
        link.click();
    }

    handleImages(event) {
        window.URL = window.URL || window['webkitURL'];

        const files = event.target.files;

        this.emptyFilesMessageVisible = files.length;

        const fileList = document.querySelector('#fileList');

        fileList.innerHTML = '';
        fileList.appendChild(document.createElement('ul'));

        if (files.length) {
            for (let i = 0; i < files.length; i++) {
                const img = document.createElement('img');
                img.src = window.URL.createObjectURL(files[i]);
                img.height = 150;
                img.onload = function() {
                    window.URL.revokeObjectURL(img.src);
                };

                const listItem = document.createElement('li');
                const listItemInfo = document.createElement('span');

                listItemInfo.innerHTML = files[i].name + ': ' + files[i].size + ' bytes';

                listItem.appendChild(img);
                listItem.appendChild(listItemInfo);
                fileList.appendChild(listItem);
            }
        }
    }
}    