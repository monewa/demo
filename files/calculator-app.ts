
class Calc{
	constructor(){  }
	
	step:string= 'enter first number';
	answer:number= 0;
	screenValue:string= '';
	previousSymbol:string;
	periodIsPressed:boolean= false;
	acceptedValues:string[]= ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
	acceptedOperators:string[]= ['+', '-', '*', '/', '=', 'Enter'];
	acceptedFunctions:string[]= ['Delete', 'Backspace'];
	
	setValue(num:string):void{
		if(this.moreThanOnePeriod(num)){
			return;
		}
		this.screenValue+=num;
		this.setMainScreen();
	}
	
	validateValue(key:string):boolean{
		let isValid:boolean=false;
		this.acceptedValues.forEach((v:string)=> {
			if(v==key){
				isValid= true;
			}
		})
		return isValid;
	}
	
	validateOperator(key:string):boolean{
		let isValid:boolean=false;
		this.acceptedOperators.forEach(o=>{
			if(o==key){
				isValid= true;
			}
		})
		return isValid;
	}
	
	validateFunctions(key:string):boolean{
		let isValid:boolean=false;
		this.acceptedFunctions.forEach(f=>{
			if(f==key){
				isValid= true;
			}
		})
		return isValid;
	}
	
	setKeyInput():void{
		document.onkeyup= (keyEvent:KeyboardEvent)=>{
			let key= keyEvent.key
			if(this.validateValue(key)){
				this.setValue(key);
			} 
			else if(this.validateOperator(key)){
				this.calculate(key);
			}
			else if(this.validateFunctions(key)){
				this.runFunction(key);
			}
		}
	}
		
	moreThanOnePeriod(num:string):boolean{
		if(num=='.'){
			if(this.periodIsPressed){
				return true;
			}
			else{			
				this.periodIsPressed=true;
				return false;
			}
		}
	}
	
	clearScreenForNextNum():void{
		this.clearEntry();
		this.setAnswerScreen();
	}
	
	runOperation():void{
		let value:number= parseFloat(this.screenValue);
		if(this.previousSymbol=='+'){
			this.answer+= value;
		}
		if(this.previousSymbol=='-'){
			this.answer-= value;
		}
		if(this.previousSymbol=='*'){
			this.answer*= value;
		}
		if(this.previousSymbol=='/'){
			this.answer/= value;
		}	
		
	}

	moreThanOneOperator(operation:string):boolean{
		if(this.screenValue==''){
			if(operation== '=' || operation=='Enter'){
				return false
			}
			this.previousSymbol= operation;
			this.setAnswerScreen();
			return true;
		}	
	}
	
	calculate(operation?:string):void{
		if(this.moreThanOneOperator(operation)){
		console.log('more.ans '+this.answer)
			if(operation== '=' || operation=='Enter'){
		console.log('eq .ans '+this.answer)
			this.runEquals();
		}
		return;
		}
		if(this.step== 'enter first number'){ 
			this.answer= parseFloat(this.screenValue);
			this.previousSymbol= operation;
			this.step= 'enter next number';
			this.clearScreenForNextNum(); 
		}
		else if(this.step== 'enter next number'){ 
		console.log('nxt .ans '+this.answer)
			this.runOperation();
			this.previousSymbol= operation;
			this.clearScreenForNextNum(); 
		}
		if(operation== '=' || operation=='Enter'){
		console.log('eq2 ans '+this.answer)
			this.runEquals();
		}
		console.log('end ans '+this.answer)
	} 

	runEquals():void{
		if(this.step== 'enter next number'){
			let finalAnswer:number=this.answer;
			this.clearAll();
			this.setMainScreen(finalAnswer);	
		}
	}
		
	runFunction(functions:string){
		if(functions=='Delete'){
			this.clearAll();
			return;
		} 
		if(functions=='Backspace'){
			this.clearEntry();
			return;
		} 
	}
	
	clearEntry():void{
		this.periodIsPressed=false;
		this.screenValue='';
		this.setMainScreen();
	}

	clearAll():void{
		this.step= 'enter first number';
		this.previousSymbol='';
		this.answer=0;
		this.clearEntry();
		this.setAnswerScreen(' ');
	}
	
	setMainScreen(value:number|string=this.screenValue):void{
		(<HTMLInputElement> document.getElementById('screen')).value=value+'';
	}
	
	setAnswerScreen(value:string|number=this.answer):void{
		document.getElementById('answer').innerHTML=value+' '+this.previousSymbol;
	}
}

var c= new Calc()

