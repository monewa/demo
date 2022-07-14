import {Contacts, Contact} from './Contact'
import {DraftMessage, Drafts} from './Draft'
import {Injectable} from '@angular/core'

export class SentMessage extends DraftMessage{
	
	constructor(message:string, recipient:Contact){
		super(message)
	}

}

@Injectable()
export class Sent{
	isShowing:boolean=false
	result:string=''
	message:string=''
	list:SentMessage[] = new Array(  	)
	contactList: Contact[]=[]
	output=''
	IsSelected=false
	
	start(){
		this.isShowing=true 
	}
	stop(){
		this.isShowing=false 
	}
	remove(index:number){ 
		if(confirm('are you sure')){
				this.list.splice(index, 1)
				this.output='message deleted'
		}
		else { return }
	}
}

