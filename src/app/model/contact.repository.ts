
import {Injectable} from '@angular/core'
import {Contact} from './contact.model'
import {StaticData} from './static.datasource'
import {Observable, from} from 'rxjs'
import {JsonData} from './rest.datasource'



@Injectable()

export class ContactRepository{

	constructor(private data:StaticData, private json:JsonData){ 
	//	data.getContacts().subscribe((data)=>{this.list=data} )
		this.list = data.getContacts()
	}
	
	private list: Contact[]= []
	private locator:Function= (contact:Contact, id:number):boolean=>{return contact.id==id}
	
	getList():Contact[]{
		return this.list || 'no list'
	}
	
	getListToString():string{
		let contacts=''
		this.list.find((c)=>{contacts+= c.id +'.'+c.name+'('+c.contactNo+'), '})
		return contacts || 'nothing here'
	}
	
	getContact(id:number){
		return this.list.forEach(c=> {this.locator(c, id)}) 
	} 
	
	getServerData(){
		return this.json.getContacts() || 'none server'
	}
	
	remove(id:number){
		let index = this.list.findIndex(p=> this.locator(p, id))
		if(index > -1 && index < this.list.length){
			this.list.splice(index, 1)
			return 'deleted '+index
		}
		else return 'still there '+index 
	}

}

