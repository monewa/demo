
import {Injectable} from '@angular/core'

export class Contact{
	name:string=''
	contactNo:string=''
	isSelected:boolean= false
	isAttachedToDraft:boolean=false
	
	constructor(name?:string, contactNo?:string){
	}
	
	attachToDraft():void{
		this.isAttachedToDraft= true
	}
	
	removeFromDraft():void{
		this.isAttachedToDraft=false
	}
	
	getName(): string{
		return this.name
	}
	
	toString():string{
		return this.name+' - '+this.contactNo
	}
}

@Injectable()
export class Contacts{

	newContactIsHidden:boolean=true
	readonly list: Contact[]= []
	selectedIndex:number=0
	output:string=''
	showWarning=false
	name:string=''
	contactNo:string=''
	
	show_NewContact():void{
		this.newContactIsHidden= false
	}
	close_NewContact():void{
		this.newContactIsHidden= true
	}
	
	create(name:string, contactNo:string):void{			
		this.name=name;
		this.contactNo=contactNo
		if(this.checkForMissingString(name, contactNo)){
			return
		}
		else{
			this.list.push(new Contact(name, contactNo)); 
			this.clearNameAndNumber()
			this.showWarning=false; 
		}
	}
	
	checkForMissingString(name:string, contactNo:string): boolean{
		this.showWarning=true
		
		switch (true){
			case (name=='' && contactNo==''): 
				this.output= 'contact and name is missing'; return true;	
			case (name==''): 
				this.output=  'name is missing'; return true;
			case (contactNo==''): 
				this.output=  'contact is missing'; return true;
			default: 
				this.output= 'new contact created '+name;
				this.showWarning=false;  return false;
		}
	}
	
	clearNameAndNumber():void{
		this.name= '' 
		this.contactNo= "" 
	}
	
	remove(index:number):void{ 
		this.list.splice(index, 1)
		this.output='contact deleted'
	}
	
}