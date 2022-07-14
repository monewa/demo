import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule  } from "@angular/forms";
import {RouterModule} from '@angular/router'
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {AppRoutingModule, mainComponents} from './app-routing.module';
import { AppComponent} from './app.component'
import { MessageModule } from './messaging/message.module'


@NgModule({
  declarations: [mainComponents, AppComponent],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule,
	AppRoutingModule, MessageModule
  ],
  bootstrap: [AppComponent ],
})
export class AppModule { }
