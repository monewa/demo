import {Contacts, Contact} from './Contact'
import {Sent, SentMessage} from './SentItems'
import {Injectable} from '@angular/core'

export class DraftMessage{
	message:string=''
	date:string= ''	
	recipients: Contact[]=[]
	isSelected:boolean=false
	isSent:boolean=false
	contactIsAdded:boolean=false
	noOfRecipients:number=0
	sentTo:string=''
	openEdit:boolean=false
	constructor(message:string){
		this.message=message
		this.date= new Date().toUTCString()
	}
	
	setMessage(message:string):void {
		this.message=message
		this.date= new Date().toUTCString()
	}
	
	addRecipient(contact:Contact):void { 
		this.recipients.push(contact)
		contact.attachToDraft()
	}
	
	removeRecipient(index:number):void{
		this.recipients.splice(index, 1)
	}
	
	checkIfContactIsAdded():boolean{
		return this.contactIsAdded= (this.recipients.length<=0)? false: true 
	}

	getRecipients():string{
		let recipient:string= ''
		this.recipients.forEach(
			(r)=> {recipient+= r.getName()+', '	}
		)
		return recipient
	}
	
	toString():string{
		this.sentTo= '; sent to:'+ this.getRecipients()
		return this.date+ ' - '+this.message
	}
}

//-		-	-					-	-		-DRAFTS-			-	-				-	-
@Injectable()
export class Drafts{
	isShowing:boolean= true
	result=''
	message=''
	contactList: Contact[]=[]
	list:DraftMessage[]=[]
	sentList:SentMessage[]=[]
	recipientsIsShowing:boolean=false
	noRecipients=false
	addContactBtnCaption:string='Add contact'
	draft= new DraftMessage('' )
	recipientsOutput=''
	showWarning:boolean=false
	start():void{
		this.isShowing=true
		this.result=''
	}
	stop():void{
		this.isShowing=false
	}

	showRecipients(): void{
		this.recipientsIsShowing= true
		this.checkForRecipients()
	}
	closeRecipients():void{
		this.recipientsIsShowing= false
	}
	triggerNoAttachedContactsWarning(): void{
			this.showRecipients()
			this.result='add contact first'
			this.showWarning=true
	}
	resetView():void{
		this.draft= new DraftMessage(this.message )
		this.message=''
		this.recipientsIsShowing=false
		this.showWarning=false
		this.resetContactList()
	}
	addRemoveRecipient(contact:Contact):number{
		let i= this.draft.recipients.indexOf(contact)
		if(contact.isAttachedToDraft){ 
			this.draft.removeRecipient(i)
			contact.removeFromDraft()
		}
		else {
			this.draft.addRecipient(contact)
			contact.attachToDraft()
		}
		return i
	}
	
	checkForRecipients():void{
		this.noRecipients= (this.contactList.length<=0)? true: false
		this.recipientsOutput= this.noRecipients? 
												'No contacts here' : 'Send to:'
		this.noRecipients=false
	}
	save():void{
		if(this.checkIfContactIsAdded()) {
			this.draft.setMessage(this.message)
			this.list.push(this.draft) 
			this.result='message saved' 
			this.resetView()
		}
	else{
			this.triggerNoAttachedContactsWarning()
		}
	}
	
	edit(draft:DraftMessage):void{
		draft.isSelected=!draft.isSelected
	    draft.openEdit=!draft.openEdit
	}
	
	saveEdit(draft:DraftMessage, message:string){
		draft.setMessage(message)
		 draft.openEdit=false
	}
	
	send():void{ 
		//this.sentList.push( new SentMessage(this.message, contact)) 
		this.result='message sent' 
		this.message=''
	}
	
	checkIfContactIsAdded():boolean{
		if(this.draft.checkIfContactIsAdded()){
			this.showWarning=false 
			return true
		}
		else{ 
			this.triggerNoAttachedContactsWarning()
			return false
		}
	}
	
	resetContactList():void{
		this.contactList.forEach( 
			c =>{if(c.isAttachedToDraft){
				c.isAttachedToDraft=false
			}
		})
	}
	getRecipients():string{
		return this.draft.getRecipients()
	}
	
	getNoOfRecipients():number{
		return this.draft.recipients.length
	}
	
	remove(index:number):void{
		this.list.splice(index, 1)
	}

	hideButtons():boolean{ 	
		if(this.message==="") { return true  } 
		this.result=''
		return  false
	}
	clearText():void{ 
		if(this.message!=''){ 
			this.message='' 		
		}
	}
}


