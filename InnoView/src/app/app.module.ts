import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { AboutComponent } from './about/about.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileManagerModel, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { FileSystemManagerComponent } from './file-system-manager/file-system-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    AboutComponent,
    TutorialsComponent,
    HomeComponent,
    LandingComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadComponent,
    NgxFileDropModule,
    FileManagerModule,
    FileSystemManagerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
