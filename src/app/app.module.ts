import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageListComponent } from './message-list/message-list.component';
import {HttpClientModule} from '@angular/common/http';
import { MessageService } from './message.service';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessageConListsComponent } from './message-con-lists/message-con-lists.component';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { MessageSearchedListsComponent } from './message-searched-lists/message-searched-lists.component';
import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { TextHighlightPipe } from './highlight-pipe/text-highlight.pipe';






@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageDetailComponent,
    MessageConListsComponent,
    MessageSearchedListsComponent,
    TextHighlightPipe,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    FormsModule,
    BrowserAnimationsModule,
    TooltipModule,
    DialogsModule,
    ButtonsModule,
    PopupModule,
    TextInputHighlightModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
