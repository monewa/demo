

	
class Calc{
	constructor(){  }
	
	 step:string= 'enter first number';
	 answer:number= 0;
	 screenValue:string= '';
	 previousSymbol:string;
	 periodIsPressed:boolean= false;
	 acceptedValues:string[]= ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0','.'];
	 acceptedOperators:string[]= ['+', '-', '*', '/', '=', 'Enter'];
	
	 setNumber(num:string):void{
		if(this.checkForPeriod(num)){
			return;
		}
		this.screenValue+=num;
		this.setMainScreen();
	}
	
	 setKeyInput():void{
		document.onkeyup= (keyEvent:KeyboardEvent)=>{
			let key:string= keyEvent.key
			this.acceptedValues.forEach((v:string)=> {
				if(v==key){
					this.setNumber(key);
				}
			})
			this.acceptedOperators.forEach(o=>{
				if(o==key){
					this.calculate(key);
				}
			}) 
		}
	}
		
	 checkForPeriod(num:string):boolean{
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
		this.setAnswerScreen(this.answer);
	}
	
	 runOperation(operation:string):void{
		let value:number= parseFloat(this.screenValue);
		if(operation=='+'){
			this.answer+= value;
		}
		if(operation=='-'){
			this.answer-= value;
		}
		if(operation=='*'){
			this.answer*= value;
		}
		if(operation=='/'){
			this.answer/= value;
		}
		
	}

	 calculate(operation:string):void{
		if(this.screenValue==''){
			this.previousSymbol= operation;
			this.setAnswerScreen();
			return;
		}	
		if(this.step== 'enter first number'){
			this.answer= parseFloat(this.screenValue);
			this.previousSymbol= operation;
			this.step= 'enter next number';
		}
		else if(this.step== 'enter next number'){	
			this.runOperation(this.previousSymbol);
			this.previousSymbol= operation;
			this.step='repeat';
		}
		else if(this.step== 'repeat'){
			this.runOperation(this.previousSymbol);
			this.previousSymbol= operation;
			this.step='enter next number';
		}
		this.clearScreenForNextNum();
		 if(operation=='=' ||operation=='Enter'){
			this.equals();
		}
	}

	 equals():void{
			let finalAnswer:number=this.answer;
			this.clearAll();
			this.setMainScreen(finalAnswer);
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
		this.setAnswerScreen('');
	}
	
	 setMainScreen(value:number|string=this.screenValue):void{
		(<HTMLInputElement> document.getElementById('screen')).value=value+'';
	}
	
	 setAnswerScreen(value:string|number=this.answer):void{
		if(this.previousSymbol=='Enter' ||this.previousSymbol=='='){
			this.previousSymbol= ''
		}
		document.getElementById('answer').innerHTML=value+' '+this.previousSymbol;
	}
	
	 getScreenValue():string{
		return (<HTMLInputElement> document.getElementById('screen')).value;
	}
	
}

var c= new Calc()

