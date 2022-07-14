import {Component, OnInit} from '@angular/core'
import {Drafts, DraftMessage} from '../Draft'

@Component({
	selector: 'drafts-app',
	templateUrl: 'drafts.component.html',
	styleUrls: ['../message.component.css', '../../app.component.css' ] 
})

export class DraftComponent{
	constructor(public drafts:Drafts){}
}
