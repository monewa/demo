import {Component, OnInit} from '@angular/core'
import {SentMessage, Sent} from '../SentItems'
import { Contact} from '../Contact'


@Component({
	selector: 'sent-app',
	templateUrl: 'sent.component.html',
	styleUrls: [  '../message.component.css', '../../app.component.css' ]
})

export class SentComponent{
	constructor(public sent:Sent){ }
}
