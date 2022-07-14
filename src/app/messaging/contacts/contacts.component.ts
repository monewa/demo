
import {Contacts} from '../Contact'
import {Component, OnInit} from '@angular/core'
import {ContactRepository} from '../../model/contact.repository'

@Component({
	selector: 'contacts-app',
	templateUrl: 'contacts.component.html',
	styleUrls: ['../message.component.css', '../../app.component.css' ] 
})

export class ContactsComponent{	
	constructor(public contacts:Contacts, private repository:ContactRepository){ }
	
/* 	contact=this.repository.getContactById(0)
	list= this.repository.getList() */
	listDetails= this.repository.getListToString()
}

