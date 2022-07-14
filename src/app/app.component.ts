import { Component, OnInit, } from '@angular/core';
import {Data} from './messaging/message.component'
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	constructor(private data:Data, private router: Router) { }
	
	ngOnInit(): void{
		this.data.getMessageData()
	//	this.router.navigateByUrl("/test")
	//	this.router.navigateByUrl("/message") 
	}
}

