
import {Component} from '@angular/core'
import {NgForm} from '@angular/forms'
import {Observable, from} from 'rxjs'

@Component({
selector: 'login-form',
templateUrl: 'login.component.html',
styleUrls:['login.component.css', '../app.component.css']
})

export class LoginForm{
	//const password='a'
	submitted=false
	//element:HTMLInputElement
	inputUsername='';  inputPassword=''
	verified=false
	view:string='welcome'
	
	getJSON(){
		let value= this.inputUsername  //{name:'mo', age:'200'}
		return JSON.stringify(value)
		return value
	}
	
	resetLoginForm(){ 
		this.inputUsername=''; 
		this.inputPassword=''
	}
	validform:any=false
	verify(){
		
		this.submitted=true
		this.verified= this.inputUsername=='a' && this.inputPassword=='a'
		if(this.verified){
			this.submitted=false
		}
	//	else this.submitted=false
	}
	//p166
	submitForm(form:NgForm){
		if(form.valid){
		//	this.verified=true
		}
		else {
			this.verified=false
			this.submitted=false
		}
		this.validform=form.valid
	
	}

	
//							- - - - - - - - - - -  profile - - - - - - - - - - 
	
	switchView(view:string):void{
		switch(view){
			case 'welcome': this.view=view; break
			case 'profile': this.view=view; break
			case 'blog': this.view=view; break
		}
	}
	
	logOff(){
		this.verified=false
		this.resetLoginForm()
		this.switchView('welcome')
	}
}