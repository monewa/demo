import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fire',
  templateUrl: './fire.component.html',
  styleUrls: ['./fire.component.css', '../app.component.css']
})
export class FireComponent implements OnInit {
	constructor() { }
	ngOnInit(): void { 
		this.view='welcome'
	}
	view:string=''
	switchView(view:string):void{
		switch(view){
			case 'welcome': this.view=view; break
			case 'start': this.view=view; this.shotsFired=false; break
			case 'burn': this.view=view; break
		}
	}
	
	shotsFired=false
	shootFireball(){
		this.shotsFired=true
	}
	
	
}
