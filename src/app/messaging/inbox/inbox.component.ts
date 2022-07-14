
import {Component, OnInit, Injectable} from '@angular/core'


@Component({
	selector: 'inbox-app',
	templateUrl: 'inbox.component.html',
	styleUrls: ['../message.component.css', '../../app.component.css' ] 
})

export class InboxComponent{
	constructor(public inbox:Inbox){  }
}

@Injectable()
export class Inbox {
	
	message= ''
	list:InboxMessage[]=[]
	num=0
	output=''
	isShowing=false
	
	start(){
		this.isShowing=true
		this.generateMessage()
	}
	stop(){
		this.isShowing=false 
	}
	
	deselectAll(){
		this.list.forEach(m=>{ m.isSelected=false} )
	}
	remove(index:number):void {
		this.list.splice(index, 1)
		this.output='message deleted'
	}
	generateMessage():void {
		this.num=Math.floor(Math.random()*4)
		switch(this.num){
			case 0:  this.message='Morning'; break
			case 1:  this.message='Sho my friend'; break
			case 2:  this.message='Howzit bf'; break
			case 3:  this.message='Hello my boy'; break
		}
		this.list.push( new InboxMessage(this.message) )
		this.output= 'new message arrived'
	}

}
	
export class InboxMessage{
	message:string=''
	date: string= ''
	isSelected=false
	
	constructor(message:string){
		this.message= message
		this.date= new Date().toUTCString()
	}
	
	toString():string{
		return this.message+' - '+ this.date
	}
	
	select(){
		this.isSelected= !this.isSelected
	}
}



