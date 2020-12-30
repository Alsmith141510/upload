// deepcode ignore AttrAccessOnNull: <please specify a reason of ignoring this>
import { Component, OnInit, HostListener } from '@angular/core';
import { FileDropElement, FileDropEvent } from 'file-drop-element';
import {UploadTaskComponent} from '../upload-task/upload-task.component';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  imgfiles: File[] = [];
  videofiles: File[] = [];
  imgType = 'image';
  videoType = 'video';
  ngOnInit() {
    const dropManyElement = document.getElementById('dropTarget');
    const dropVideoElement = document.getElementById('dropVideoTarget');
    dropManyElement.addEventListener('filedrop', (event) => {
      // console.log('drop Many:::', event);
      // console.log('drop Many file 0:::', event.files[0]);
      const imgArraylen = event.files.length;
      // console.log('j::::' + imgArraylen);
      if (imgArraylen > 0) {
          event.files.map((f) => this.imgfiles.push(f));
          dropManyElement.innerText = event.files.map((f) => f.name).join('\n');
      } else {
        console.log('only Images are allowed');
      }
      console.log('files array:::' + this.imgfiles.length + ' file[]' + this.imgfiles);
    });

    dropVideoElement.addEventListener('filedrop', (event) => {
      console.log('drop Video:::', event);
      console.log('drop Video file 0:::', event.files[0]);
      const videoArraylen = event.files.length;
      if (videoArraylen > 0) {
        event.files.map((f) => this.videofiles.push(f));
        dropManyElement.innerText = event.files.map((f) => f.name).join('\n');
    } else {
      console.log('only Images are allowed');
    }
    });
  }

  onDrop($event) {}

}
