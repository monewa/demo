
import {Component, OnInit, Input, Injectable} from '@angular/core'
import {Sent, SentMessage} from './SentItems'
import {Drafts, DraftMessage} from './Draft'
import {Contacts, Contact} from './Contact'
import {Inbox, InboxMessage} from './inbox/inbox.component'
import {Router} from '@angular/router'
import {ContactRepository} from '../model/contact.repository'

@Component({
selector: 'app-message',
templateUrl: './message.component.html',
styleUrls:['./message.component.css', '../app.component.css']
//,providers: [messageServices]
})

export class MessageComponent implements OnInit{
constructor(public inbox:Inbox, public drafts:Drafts, public sent:Sent, public contacts: Contacts, private router: Router, public contactRep:ContactRepository){ }
	
	ngOnInit(): void{
	//	this.router.navigateByUrl("message/contacts")
	
	}
	contact1= this.contactRep.getContact(6)
	serverData= this.contactRep.getServerData()
	deleted= this.contactRep.remove(2)
	
	changeView():void{
		this.inbox.start()
	}	
	
}

@Injectable()
export class Data{

	constructor(public inbox:Inbox, public drafts:Drafts, public sent:Sent, 
							public contacts: Contacts){ }
	
	getMessageData(){
		this.contacts.list.push(new Contact('mme', '067')
												 ,new Contact('bae', '071')
												 ,new Contact('tso', '030'))
		this.drafts.contactList= this.contacts.list
	//this.drafts.sentList= this.sent.list
		let draft:DraftMessage= new DraftMessage('hey ...' )
		let draft2:DraftMessage= new DraftMessage('let me ...')
		draft.addRecipient(this.drafts.contactList[0])
		draft2.addRecipient(this.drafts.contactList[2])
		this.drafts.list.push( draft, draft2 )
		this.sent.list.push( new SentMessage(
														'Hello my baby', this.drafts.contactList[0]) 
									      ,new SentMessage(
														'Hello my n', this.drafts.contactList[1]) )
		this.drafts.resetContactList()
		this.inbox.list.push(new InboxMessage('Welcome message'), 
											new InboxMessage('ads'))
	}
	
}

export const messageClasses=[Drafts, Inbox, Sent, Contacts, Data]
