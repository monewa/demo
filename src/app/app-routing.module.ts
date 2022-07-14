import {WaterComponent} from './water/water.component'
import {LoginForm} from './login/login.component'
import {MessageComponent, messageClasses} from './messaging/message.component'
import { FireComponent } from './fire/fire.component';
import {messageRoutes, messageComponents} from './messaging/message.module'
import {SentComponent} from './messaging/sent/sent.component'
import {DraftComponent} from './messaging/drafts/drafts.component'
import {InboxComponent} from './messaging/inbox/inbox.component'
import {ContactsComponent} from './messaging/contacts/contacts.component'
import {TestComponent} from './test/test.component'
import {HomeComponent} from './home/home.component'
import {MessageFirstGuard} from './message-first.guard'
import {RouterModule, Routes} from '@angular/router'
import {NgModule, ModuleWithProviders} from '@angular/core'

let appRoutes:Routes=[ 
	 {path:'', pathMatch:'full', redirectTo:'home' },
	 {path:'home', component:HomeComponent},
	 {path:'fire', component:FireComponent},
	 {path:'water', component:WaterComponent},
	 {path:'login', component:LoginForm},
	 {path:'test', component:TestComponent},
	 {path:'message', component:MessageComponent}
 ]
 
 let routing:any= RouterModule.forRoot(appRoutes)
							
@NgModule({
	imports:[routing], 
	exports:[RouterModule]
})

export class AppRoutingModule{ }

export const mainComponents= [HomeComponent, FireComponent,WaterComponent, LoginForm, TestComponent]

