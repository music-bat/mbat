import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CompressService } from '../../compress.service';

@UntilDestroy()
@Component({
  selector: 'mbat-add-group-page-03',
  template: `
    <div class="content-head">
      <mbat-text size="l" mv="m">Erstelle deine Gruppe</mbat-text>
    </div>
    <div class="content-body">
      <ion-item color="transparent" lines="none">
        <ion-label position="stacked"
          >Gruppenbild
          <ion-text color="danger">*</ion-text>
        </ion-label>
      </ion-item>

      <div class="group-image-container">
        <div class="group-image" [style.background-image]="imagePreview" (click)="promptImage()">
          <ion-icon
            *ngIf="createGroupForm.controls.image.value"
            color="danger"
            name="close-circle"
            (click)="destroyImage($event)"
          ></ion-icon>
          <ion-icon
            *ngIf="!createGroupForm.controls.image.value"
            color="primary"
            name="add-circle"
            (click)="promptImage($event)"
          ></ion-icon>
        </div>
        <input [(ngModel)]="fileInputValue" #imageInput [hidden]="true" type="file" accept="image/*" (change)="loadImage($event)" />
      </div>

      <form [formGroup]="createGroupForm">
        <ion-item color="transparent">
          <ion-label position="stacked"
            >Gruppenname
            <ion-text color="danger">*</ion-text>
          </ion-label>
          <ion-input formControlName="name" [clearInput]="true" [debounce]="0"></ion-input>
        </ion-item>
        <ion-item color="transparent">
          <ion-label position="stacked">Beschreibungstext</ion-label>
          <ion-textarea formControlName="description" rows="3">
            <ion-text class="max-length-hint">
              <ion-text [color]="createGroupForm.controls.description.valid ? 'success' : 'danger'">{{
                createGroupForm.controls.description.value?.length || 0
              }}</ion-text>
              /100
            </ion-text>
          </ion-textarea>
        </ion-item>
      </form>

      <mbat-text size="s">
        <mbat-text color="danger">*</mbat-text>
        = Pflichtfeld
      </mbat-text>
    </div>
    <div class="content-footer buttons flexbox ion-justify-content-end">
      <ion-button (click)="handleFormSubmit()" [disabled]="createGroupForm.invalid" [color]="createGroupForm.valid ? 'primary' : 'light'">
        <ion-label>Gruppe erstellen</ion-label>
        <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
      </ion-button>
    </div>
  `,
  styleUrls: ['add-group.page.scss'],
  styles: [
    `
      .group-image {
        position: relative;
      }

      .group-image > ion-icon {
        font-size: 48px;
        position: absolute;
        bottom: -20px;
        right: -20px;
        background: var(--ion-background-color);
        border-radius: 100%;
      }

      ion-textarea {
        position: relative;
        padding-bottom: 12px;
      }

      .max-length-hint {
        opacity: 0.5;
        font-size: 12px;
        position: absolute;
        bottom: 2px;
        right: 0;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGroupPage03Component {
  previewImage: string | ArrayBuffer;
  parseFile: Parse.File;
  fileInputValue: unknown;

  @Output() createGroup = new EventEmitter<{
    image: File;
    name: string;
    description: string;
  }>();
  @Input() mode: 'create' | 'join';

  createGroupForm = new UntypedFormGroup({
    image: new UntypedFormControl(undefined, [Validators.required]),
    name: new UntypedFormControl(undefined, [Validators.required, Validators.min(3), Validators.maxLength(30)]),
    description: new UntypedFormControl(undefined, [Validators.maxLength(100)]),
  });

  get imagePreview() {
    return `url(${this.previewImage || 'assets/img/image-placeholder.png'})`;
  }

  constructor(private cdr: ChangeDetectorRef, elementRef: ElementRef, private compressService: CompressService) {
    this.createGroupForm.controls.description.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {});
  }

  @ViewChild('imageInput') imageInput: ElementRef;

  async promptImage(ev?: MouseEvent) {
    ev?.stopImmediatePropagation();

    const element = await this.imageInput.nativeElement;
    element.click();
  }

  async loadImage(ev: Event) {
    const file: File = (ev as Event & { target: HTMLInputElement }).target.files.item(0);
    if (!file) return;

    await this.uploadFile(file);

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      this.previewImage = event.target.result;
      this.createGroupForm.controls.image.setValue(this.parseFile);
      this.cdr.markForCheck();
    });
    reader.readAsDataURL(file);
  }

  async uploadFile(file: File) {
    if (this.parseFile) {
      await this.destroyImage(undefined, true);
    }

    this.parseFile = new Parse.File(file.name, await this.compressService.compressImage(file, 200));
    this.parseFile.addTag('group-image', true);

    await this.parseFile.save();
  }

  async destroyImage(ev?: MouseEvent, skipPreviewImageReset = false) {
    ev?.stopImmediatePropagation();

    await Parse.Cloud.run('deleteFile', this.parseFile);
    // Clear local file object which as just been deleted.
    this.parseFile = undefined;

    // Clear input value to allow the user to upload a previously deleted file.
    this.fileInputValue = undefined;

    this.createGroupForm.controls.image.reset();

    if (!skipPreviewImageReset) {
      // we don't want to trigger change detection,
      // when another image will replace the deleted one.
      this.previewImage = undefined;
      this.cdr.markForCheck();
    }
  }

  handleFormSubmit() {
    this.createGroup.next(this.createGroupForm.value);
  }

  /*
   * With this method we achieve auto grow and auto shrink of the textarea.
   * */
  autoResizeTextarea(value) {
    const lines = value.split('\n').length;
    const textarea = document.querySelector('textarea');
    if (textarea.scrollHeight > 90) {
      textarea.style.cssText = `height: ${(lines > 3 ? lines : 4) * 24}px; overflow:hidden;`;
      this.cdr.markForCheck();
    }
  }
}
