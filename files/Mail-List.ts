
/* import x from './mail-list.js' ;*/
//const { firstName } = data;
 

class User{

	id:number;
	firstName:string;
	lastName:string;
	country:string;
	email:string;
	phone:string;
	comments:string;
	
	constructor(id?:number, firstName?:string, lastName?:string, country?:string, 
	email?:string, phone?:string, comments?:string){ 
		this.id= id;
		this.firstName= firstName;
		this.lastName= lastName;
		this.country= country;
		this.email= email;
		this.phone= phone;
		this.comments= comments;
	}
}

class MailList{

	constructor(){ }
	
//	url:string= 'http://localhost:3500/contacts/'
	url:string= 'mail-list.json';
	jsonRequest= new Request(this.url);	
	users:User[]= this.getStaticData();
	//users:User[]= this.getLocal()
	nextUserId= this.users.length+1;
	userIndex= 0;
	
	startup():void{
		this.printUsers(); 
		this.init();
		
	}
	
	preventForm():void{
		let form= document.getElementById('form');
		form.addEventListener('submit', 
		function(event){
			event.preventDefault();
		});		
	}
	
	validateForm():boolean{
		if(this.checkFormValidity('name') || this.checkFormValidity('lastName') ||
			this.checkFormValidity('country') || this.checkFormValidity('email') || 
			this.checkFormValidity('phone') || this.checkFormValidity('code')){
				return true;
		}
	}
	
	checkFormValidity(id:string):boolean{
		let element = (<HTMLInputElement>document.getElementById(id));
		if(!element.checkValidity()){
			this.setElementColor('red');
			this.setElementBorderColor(id, 'red');
			this.setMessage(element.validationMessage);
			if(id== 'phone'){
				this.setMessage('Phone number must be 7 characters');
			}
			if(id== 'code'){
				this.setMessage('Code must be 4 characters');
			}
			return true;
		}
		this.setMessage('');
		this.setElementBorderColor(id, 'white')
	}
	
	saveForm():void{
		if(this.validateForm()){
			return;
		}  
		let name= this.getElementValue('name');
		let lastName= this.getElementValue('lastName');
		let country= this.getElementValue('country');
		let email= this.getElementValue('email');
		let phone= `+${this.getElementValue('code')} ${this.getElementValue('phone')}`;
		let comments= this.getElementValue('comments') 
				
		let user:User= new User(this.nextUserId, name, lastName, country, email, phone, comments);
		this.users.push(user);
		this.nextUserId++;
		this.setMessage('Your proflie is saved successfully' );
		this.setElementColor('lime');
	//	this.saveLocal();
	}
	
	editUsers(index:number):void{
		this.revealAllElements('data');
		this.hideAllElements();
		this.hideRowElements('data', index);
		this.revealRowElements('editbox', index);
		this.adjustEditBoxSize(index);
	}
	
	saveNewData(index:number):void{
		let message:string= ''
		message+= this.updateSave(this.users[index]?.firstName, 
		this.getElementValue(`editname${index}`), `name${index}`, index);
		
		message+= this.updateSave(this.users[index]?.lastName, 
		this.getElementValue(`editlastname${index}`), `lastname${index}`, index);
		
		message+= this.updateSave(this.users[index]?.country, 
		this.getElementValue(`editcountry${index}`), `country${index}`, index);
		
		message+= this.updateSave(this.users[index]?.email, 
		this.getElementValue(`editemail${index}`), `email${index}`, index);
		
		message+= this.updateSave(this.users[index]?.phone, 
		this.getElementValue(`editphone${index}`), `phone${index}`, index);
		
		this.hideRowElements('editbox', index);
		this.revealRowElements('data', index);
		this.setDataMessage(message);
	}
	
	updateSave(oldVal, newVal, textId, index ):string{
		if(oldVal != newVal){
			if(textId == `name${index}`){
				this.users[index].firstName= newVal;
			}
			if(textId == `lastname${index}`){
				this.users[index].lastName= newVal;
			}
			if(textId == `country${index}`){
				this.users[index].country= newVal;
			}
			if(textId == `email${index}`){
				this.users[index].email= newVal;
			}
			if(textId == `phone${index}`){
				this.users[index].phone= newVal;
			}
			this.setElementText(textId, newVal)
			return `${oldVal} is changed to ${newVal}; `;
		} 
		return '';
	}
	
	saveLocal():void{
		window.localStorage.setItem('users', JSON.stringify(this.users));
	}
	
	getLocal():string{
		let data= window.localStorage.getItem('users');
		return JSON.parse(data);
	}
	
	deleteUser(index:number):void{
		let message:string= this.users[index]?.firstName+' deleted';
		this.setDataMessage(message);
		this.users.splice(index, 1);
		this.printUsers();
	}
	
	printUsers():void{
		//this.users= this.getLocal();
		let user:string= ''; 
		this.users.forEach( 
			function(u, index) {
				user+=  
				`<tr >
					<td>
						<button onclick= "m.deleteUser(${index})" id= "del">x	</button>
					</td>					
					<td>
						<button onclick= "m.editUsers(${index})" class="edit" 
										id= 'editbtn${index}'>Edit
						</button>
						<button id= 'savebtn${index}' onclick= "m.saveNewData(${index})" 
									   class= "edit">Save</button>
					</td>
					<td>${u.id}</td> 					
					<td> 
						<label id='name${index}'>${u.firstName}</label>
						<input id='editname${index}' value= '${u.firstName}'						
									maxlength= '15' class= 'editUser' placeholder= 'name'/>					
					</td>
					<td> 
						<label id='lastname${index}'>${u.lastName}</label>
						<input id='editlastname${index}' value='${u.lastName}'						
									maxlength='15' class='editUser' placeholder='lastname' />					
					</td>
					<td> 
						<label id='country${index}'>${u.country}</label>
						<input id='editcountry${index}' value='${u.country}'						
									maxlength='15' class='editUser' placeholder='country' />					
					</td>
					<td> 
						<label id='email${index}'>${u.email}</label>
						<input id='editemail${index}' value='${u.email}' maxlength='25' 			
									type='email' class='editUser' placeholder='email' />					
					</td>
					<td> 
						<label id='phone${index}'>${u.phone}</label>
						<input id='editphone${index}' value='${u.phone}' maxlength='14' 			
									 class='editUser' placeholder='phone' />					
					</td>				
					<td>${u.comments}</td>
				</tr>`;
			})
			if(this.users.length<= 0){
				user= '<tr><td>no data found</td></tr>'; 
			}
		document.getElementById('list').innerHTML= user;
		this.hideAllElements();
		this.revealAllElements('data');
	}

	getStaticData(){
		return [
			new User(1, 'John', 'Smith', 'USA', 'smith@gmail.com', '+5675 433433', 'great'),
			new User(2, 'Thoho', 'Yandou', 'RSA', 'thoho@gmail.com', '+2783 433670', 'like it'),
			new User(3, 'Mary', 'Ann', 'UK', 'mary@gmail.com', '+5672 145697', 'love it')
		];  
	
	}

	getUsers(callback):any{
		let list
/**/	let http= new XMLHttpRequest()
		http.overrideMimeType('application/json')
		http.open('GET', './mail-list.json', true);
	//	console.log(callback())
		http.onreadystatechange= function(event){ 
				callback(http.responseText)
			if(http.readyState== 4 && http.status== 200){
			//	list= JSON.parse()
			}
		http.send(null)
		}  
	
		/* fetch(this.jsonRequest)
		.(response => response.json())
		.(data=> data= this.users);*/
		//this.setMessage(this.users) 
	}
	
	init(){
		this.getUsers( function (response){
			console.log('response =', response);
    var json = JSON.parse(response);
    console.log('your local JSON =', JSON.stringify(json, null, 4));
    // 4. render to your page
    let app = document.getElementById('app');
    app.innerHTML = '<pre> hey' + JSON.stringify(json, null, 4) + '</pre>';

			
		})
	}
	
	adjustEditBoxSize(index:number= 0):void{
		let stringLength:number
		stringLength= this.users[index].firstName.length;
		this.setElementWidth(`editname${index}`, stringLength);

		stringLength= this.users[index].lastName.length;
		this.setElementWidth(`editlastname${index}`, stringLength);	
		
		stringLength= this.users[index].country.length;
		this.setElementWidth(`editcountry${index}`, stringLength);	
		
		stringLength= this.users[index].email.length;
		this.setElementWidth(`editemail${index}`, stringLength);	
		
		stringLength= this.users[index].phone.length;
		this.setElementWidth(`editphone${index}`, stringLength);	
	}
	
	clear():void{
		document.getElementById('lastName').innerHTML= 'json';
		document.getElementById('lastName').innerText= '';
	}
	
	setMessage(message:string):void{ 
		document.getElementById('message').innerText= message;
	}
	
	setDataMessage(message:string|any):void{ 
		document.getElementById('datamessage').innerText= message;
	}

	getElementValue(id:string):string{
		return (<HTMLInputElement>document.getElementById(id)).value;
	}
	
	setElementValue(id:string, data:string):void{
		(<HTMLInputElement>document.getElementById(id)).value= data;
	}
	
	setElementText(id:string, text:string):void{
		(<HTMLInputElement>document.getElementById(id)).innerText= text;
	}
	
	setElementWidth(id:string, length:number):void{
		document.getElementById(id).style.width= `${length* 5+ 80}px`;
	}
	
	setElementColor(newcolor:string, id:string= 'message'):void{
		document.getElementById(id).style.color= newcolor;
	}
	
	setElementBorderColor(id:string, newcolor:string):void{
		document.getElementById(id).style.borderColor= newcolor;
	}
	
	hideElement(id:string):void{
		document.getElementById(id).hidden= true;
	}
	
	revealElement(id:string):void{
		document.getElementById(id).hidden= false;
	}

	hideRowElements(element:string= 'editbox', index:number):void{
		if(element== 'editbox'){
			this.hideElement(`savebtn${index}`);
			this.hideElement(`editname${index}`);
			this.hideElement(`editlastname${index}`);
			this.hideElement(`editcountry${index}`);
			this.hideElement(`editemail${index}`);
			this.hideElement(`editphone${index}`);
		}
		else {
			this.hideElement(`name${index}`);
			this.hideElement(`lastname${index}`);
			this.hideElement(`country${index}`);
			this.hideElement(`email${index}`);
			this.hideElement(`phone${index}`);
		}
	}

	hideAllElements(element:string='editbox'):void{
		for(let index= 0; index< this.users.length; index++){
			this.hideRowElements(element, index);
		}
	}

	revealRowElements(element:string= 'editbox', index:number):void{
		if(element== 'editbox'){
			this.revealElement(`savebtn${index}`);
			this.hideElement(`editbtn${index}`);
			this.revealElement(`editname${index}`);
			this.revealElement(`editlastname${index}`);
			this.revealElement(`editcountry${index}`);
			this.revealElement(`editemail${index}`);
			this.revealElement(`editphone${index}`);
		}
		else{
			this.revealElement(`editbtn${index}`);
			this.revealElement(`name${index}`);
			this.revealElement(`lastname${index}`);
			this.revealElement(`country${index}`);
			this.revealElement(`email${index}`);
			this.revealElement(`phone${index}`);
		}
	}
	
	revealAllElements(element:string='editbox'):void{
		for(let index= 0; index< this.users.length; index++){
			this.revealRowElements(element, index);
		}
	}	

}

let m= new MailList();

