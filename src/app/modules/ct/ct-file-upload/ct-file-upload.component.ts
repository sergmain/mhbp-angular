import { Component, ElementRef, OnInit, ViewChild, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-ct-file-upload',
    templateUrl: './ct-file-upload.component.html',
    styleUrls: ['./ct-file-upload.component.scss']
})
export class CtFileUploadComponent implements OnInit, OnChanges {
    @Output() changed: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
    @Input() buttonTitle: string;
    @Input() acceptTypes: string = '';


    value: string = '';
    buttonTitleString: string;
    accept: string;

    ngOnInit(): void {
        this.buttonTitleString = this.buttonTitle || 'Select File';
    }

    ngOnChanges(): void {
        this.buttonTitleString = this.buttonTitle || 'Select File';
    }

    fileChanged(): void {
        this.value = this.fileInput.nativeElement.value;
        this.changed.emit('fileChanged');
    }

    removeFile(): void {
        this.fileInput.nativeElement.value = '';
        this.value = '';
        this.changed.emit('fileChanged');
    }
}