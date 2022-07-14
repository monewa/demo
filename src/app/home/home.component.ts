import { Component,  } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})

export class HomeComponent  {

	constructor() {   }
	
	h1Heading= 'Welcome to Angular'
    change:boolean = false

	changeTheHeader= () => { 
		this.h1Heading= this.change? 'A simple Angular demo' : 'Welcome to Angular'; 
		this.change=!this.change;
		}
	
	ngOnInit(): void {
	setInterval( this.changeTheHeader, 15000); //try 15s
	}
}
