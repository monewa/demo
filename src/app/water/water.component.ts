import {Component} from '@angular/core'

@Component({
selector: 'water-theme',
templateUrl: './water.component.html',
styleUrls:['./water.component.css', '../app.component.css']
})

export class WaterComponent{
	
	view:string='welcome'
	switchView(view:string):void{
		switch(view){
			case 'welcome': this.view= view; break
			case 'play': this.view= view; break
			case 'rain': this.view= view; break
		}
	}
	
	boat=''
	divPos:number=0
	moveDiv():void{
		let N=300
		let osilateMov= this.divPos%(N*2)
		this.divPos+=10
		if(osilateMov> N){
			osilateMov= (N*2)-osilateMov
		}
		this.boat=
			'border-radius: 60px;  border:solid; height:50px; width:100px; margin-left:'+osilateMov+'px;'
	}

}
