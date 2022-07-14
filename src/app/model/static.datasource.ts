
import {Contact} from './contact.model'
import {Injectable} from '@angular/core'
import {Observable, from} from 'rxjs'

@Injectable()

export class StaticData{
	contacts:Contact[]=[
						new Contact('jo', '090', 1),
						new Contact('lo', '060', 2),
						new Contact('bo', '091', 3),
						new Contact('no', '095', 4),
						new Contact('zo', '097', 5),
						new Contact('kro', '090', 6),
						new Contact()
							]
						
/*  */	 getContacts2():Observable<Contact[]>{ //p157
		return from([this.contacts])
	} 
	
	 getContacts(): Contact[]{
		return this.contacts
	}  
	
}