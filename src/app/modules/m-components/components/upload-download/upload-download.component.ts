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
    `
})

export class MUploadDownloadComponent {
    items = {
        name: '',
        age: ''
    };

    uploadedJson: string;

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
}    
