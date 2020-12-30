import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference, BUCKET } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;
  @Input() fileType: string;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  path: string;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  imageBucket;
  videoBucket;

  constructor(private afStorage: AngularFireStorage, private db: AngularFirestore) {
   }

  async ngOnInit() {
    console.log('Initalizing upload-task for storage' + this.afStorage.storage.app.name);
    await this.setupStore();
    this.startUpload();
  }

  setupStore() {
    if (this.fileType === 'image') {
      (this.afStorage as any).storage = this.afStorage.storage.app.storage('gs://learningapp-a273d.appspot.com/');
    } else if (this.fileType === 'video') {
      (this.afStorage as any).storage = this.afStorage.storage.app.storage('gs://learningapp-a273d_course/');
    }
  }
  startUpload() {
    console.log('In startupload with filetype::' + this.fileType + 'Storage Bucket:' + this.afStorage.storage.app.storage.name);
    // The storage path
    if (this.fileType === 'image') {
      console.log('Image');
      this.path = `images/${Date.now()}_${this.file.name}`;
    } else if (this.fileType === 'video') {
      console.log('Video');
      this.path = `${Date.now()}_${this.file.name}`;
    }

    this.ref = this.afStorage.ref(this.path);

    this.task = this.afStorage.upload(this.path, this.file);
 // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
                       tap(console.log),
                        // The file's download URL
                      finalize( async () =>  {
                        this.downloadURL = await this.ref.getDownloadURL().toPromise();

                        this.db.collection('files').add( { downloadURL: this.downloadURL, path: this.path });
                          }),
                          );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
