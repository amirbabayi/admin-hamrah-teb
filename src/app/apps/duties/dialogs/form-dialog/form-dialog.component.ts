import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DutyService } from '../../duties.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Duty } from '../../duty.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Editor } from '../../../../../assets/ckeditor/build/ckeditor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  action: string;
  duty: Duty;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fa-IR' }],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  dutyForm: UntypedFormGroup;
  duty: Duty;
  duties: Duty[];
  bodyHtml: string;
  coverFile: any;
  coverImage: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorConfig: any = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'exportPdf',
        'exportWord',
        'importWord',
        '|',
        'wproofreader',
        'findAndReplace',
        'selectAll',
        '|',
        'heading',
        '|',
        'removeFormat',
        'bold',
        'italic',
        'strikethrough',
        'underline',
        'code',
        'subscript',
        'superscript',
        '|',
        'specialCharacters',
        'horizontalLine',
        'pageBreak',
        '|',
        '-',
        'highlight',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'link',
        'blockQuote',
        'insertTable',
        'uploadImage',
        'ckbox',
        'mediaEmbed',
        'codeBlock',
        'htmlEmbed',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        '|',
        'outdent',
        'indent',
        'alignment',
        '|',
        'textPartLanguage',
        '|',
        'sourceEditing',
      ],
      shouldNotGroupWhenFull: true,
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
      ],
    },
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true,
    },
    htmlEmbed: {
      showPreviews: true,
    },
    image: {
      styles: ['alignCenter', 'alignLeft', 'alignRight'],
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null,
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50',
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75',
        },
      ],
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        'imageStyle:side',
        '|',
        'resizeImage',
      ],
      insert: {
        integrations: ['insertImageViaUrl'],
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    link: {
      decorators: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    mention: {
      feeds: [
        {
          marker: '@',
          feed: [
            '@apple',
            '@bears',
            '@brownie',
            '@cake',
            '@cake',
            '@candy',
            '@canes',
            '@chocolate',
            '@cookie',
            '@cotton',
            '@cream',
            '@cupcake',
            '@danish',
            '@donut',
            '@dragée',
            '@fruitcake',
            '@gingerbread',
            '@gummi',
            '@ice',
            '@jelly-o',
            '@liquorice',
            '@macaroon',
            '@marzipan',
            '@oat',
            '@pie',
            '@plum',
            '@pudding',
            '@sesame',
            '@snaps',
            '@soufflé',
            '@sugar',
            '@sweet',
            '@topping',
            '@wafer',
          ],
          minimumCharacters: 1,
        },
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
        'toggleTableCaption',
      ],
    },
    ckfinder: {
      // Upload the images to the server using the CKFinder QuickUpload command.
      uploadUrl: `${environment.baseUrl}/home/UploadFile?prefix=aaa`,
      // uploadUrl:
      //   'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
      // // Define the CKFinder configuration (if necessary).
      // options: {
      //   resourceType: 'Images',
      // },
    },
    alignment: {
      options: ['left', 'right', 'center', 'justify'],
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public Editor: any = Editor;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dutyService: DutyService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Set the defaults
    this.bodyHtml = "";
    this.action = data.action;
    dutyService.getAllDuties();
    this.duties = dutyService.data;
    if (this.action === 'edit') {
      this.bodyHtml = data.duty.Body;
      this.dialogTitle = data.duty.Title;
      this.duty = data.duty;
      this.coverImage = `${environment.baseUrl}/Uploads/${this.duty.CoverImage}`;
    } else {
      this.dialogTitle = 'رکورد جدید';
      const blankObject = {} as Duty;
      this.duty = new Duty(blankObject);
      this.coverImage = "";
    }
    this.dutyForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      Id: [this.duty.Id],
      Title: [this.duty.Title, [Validators.required]],
      CoverImage: [this.duty.CoverImage],
      Url: [this.duty.Url, [Validators.required]],
      ParentId: [this.duty.ParentId],
      Active: [this.duty.Active],
      AllowComments: [this.duty.AllowComments],
      IncludeInSitemap: [this.duty.IncludeInSitemap],
      ShowInTopSix: [this.duty.ShowInTopSix],
      ShowInFooter: [this.duty.ShowInFooter],
      BodyOverview: [this.duty.BodyOverview, [Validators.required]],
      Body: [this.duty.Body],
      MetaTitle: [this.duty.MetaTitle, [Validators.required]],
      MetaDescription: [this.duty.MetaDescription, [Validators.required]],
      MetaKeywords: [this.duty.MetaKeywords],
    });
  }
  submit() {
    // Do
  }
  onEditorChange({ editor }: ChangeEvent, target: string) {
    switch (target) {
      case 'Body':
        this.bodyHtml = editor.getData();
        break;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    const model: Duty = this.dutyForm.getRawValue() as Duty;
    model.Body = this.bodyHtml;
    if (this.action !== 'edit') {
      this.dutyService.addDuty(model).subscribe({
        next: (data) => {
          if (data.status == 0) {
            this.snackBar.open(data.message, '', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success',
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.message, '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger',
          });
        },
      });
    } else {
      this.dutyService.updateDuty(model).subscribe({
        next: (data) => {
          if (data.status == 0) {
            this.snackBar.open(data.message, '', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success',
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.message, '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger',
          });
        },
      });
    }
  }



  public onFileChange(event): void {
    if (event.target.files.length > 0) {
      this.coverFile = event.target.files[0];
    }
  }

  public uploadCover(): void {
    const form_data = new FormData();
    form_data.append("upload", this.coverFile);
    this.dutyService.uploadCover(form_data).subscribe({
      next: (data) => {
        if (data && data.fileName) {
          this.dutyForm.get('CoverImage')?.setValue(data.fileName);
          this.coverImage = `${environment.baseUrl}/Uploads/${data.fileName}`;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-danger',
        });
      },
    });
  }
}
