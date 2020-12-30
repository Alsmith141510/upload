import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadModule} from '../app/upload/upload.module';


const appRoutes: Routes = [
  {
      path: 'upload',
      loadChildren: () => import('./upload/upload.module').then((m) => UploadModule)
  }];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
