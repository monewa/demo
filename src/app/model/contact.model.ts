
import {Injectable} from '@angular/core'

@Injectable()

export class Contact{

	isSelected:boolean= false
	isAttachedToDraft:boolean=false
//	
	constructor( public name?:String, public contactNo?:String, public id?:Number,){ }
}
