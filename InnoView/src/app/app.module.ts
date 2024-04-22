import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    AboutComponent,
    TutorialsComponent,
    HomeComponent,
    LandingComponent,
    DashboardComponent,
    UserProfileComponent
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
    FileSystemManagerComponent,
    MaterialModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
