
import {NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule  } from "@angular/forms";
import { ModelModule } from '../model/model.module'
import {MessageComponent, messageClasses} from './message.component'
import {SentComponent} from './sent/sent.component'
import {DraftComponent} from './drafts/drafts.component'
import {InboxComponent} from './inbox/inbox.component'
import {ContactsComponent} from './contacts/contacts.component'
import { PagesDirective } from './pages.directive';
import { MessageFirstGuard} from '../message-first.guard'
import {RouterModule, Routes, Route} from '@angular/router'

let childRoutes:any= [//outlet:'child',
	{ path:'message/drafts', component:DraftComponent, canActivate:[MessageFirstGuard]},
    {path:'message/inbox', component:InboxComponent, canActivate:[MessageFirstGuard]},
    {path:'message/sent', component:SentComponent, canActivate:[MessageFirstGuard]},
    {path:'message/contacts', component:ContactsComponent, canActivate:[MessageFirstGuard]}
]

export const messageRoutes:any=
  {path:'message', component:MessageComponent, children:[ childRoutes]//p183
  } 
		
 let routing:any= RouterModule.forChild(childRoutes) 

export const messageComponents= [
	DraftComponent, InboxComponent, SentComponent, ContactsComponent]
	
@NgModule({
	imports:[ModelModule, BrowserModule, FormsModule, routing],
	declarations:[ messageComponents, MessageComponent, PagesDirective],
	exports:[MessageComponent, ModelModule],  
	providers:[messageClasses, MessageFirstGuard],
})

export class MessageModule{ }
