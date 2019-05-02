import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './layout/header/header.component';
import { PostDialogComponent } from './layout/post-dialog/post-dialog.component';
import { WelcomeComponent } from './layout/welcome/welcome.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AboutComponent } from './layout/about/about.component';

import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';

const components = [
  AppComponent,
  HeaderComponent,
  WelcomeComponent,
  DashboardComponent,
  PostDialogComponent,
  AboutComponent
];

const modules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  MaterialModule,
  FlexLayoutModule,
  FormsModule
];

const services = [
  AuthService,
  DataService
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  providers: [...services],
  bootstrap: [AppComponent],
  entryComponents: [PostDialogComponent]
})
export class AppModule { }
