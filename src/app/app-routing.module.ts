import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessageConListsComponent } from './message-con-lists/message-con-lists.component';
import { MessageSearchedListsComponent } from './message-searched-lists/message-searched-lists.component';

const routes: Routes = [
  { path: '', component: MessageListComponent },
  { path: 'message-detail/:id', component: MessageDetailComponent },
  { path: 'message-con/:conID', component: MessageConListsComponent },
  { path: 'message-search/:keyword', component: MessageSearchedListsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
