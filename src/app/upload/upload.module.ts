import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { UploaderComponent } from './uploader/uploader.component';
import { UploadTaskComponent} from './upload-task/upload-task.component';
// import { FileDropElement, FileDropEvent } from 'file-drop-element';


const routes: Routes = [{ path: '', component: UploaderComponent }];

@NgModule({
  declarations: [UploaderComponent, UploadTaskComponent],
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class UploadModule {}
