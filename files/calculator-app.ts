
class Calc{
	constructor(){	}
	
	static step:string='enter first number';
	static answer:number=0;
	static screenValue:string='';
	static previousSymbol:string=''
	
	static numberInput(num:string):void{
		this.screenValue+=num;
		this.setMainScreen();
	}
	
	static keyInput(){
		let key= this.getScreenValue();
		let screen =document.getElementById('screen');
		screen.addEventListener('keydown', (event)=>{		
			switch(event.code){
				case 'Digit1' || 'Digit9': this.numberInput('1'); break;
				case 'Digit2': this.numberInput('2'); break;
				case 'Digit3': this.numberInput('3'); break;
				case 'Digit4': this.numberInput('4'); break;
				case 'Digit5': this.numberInput('5'); break; 
			}
		})  
	}
	
	static clearScreen():void{
		this.screenValue='';
		this.setMainScreen('');
		this.setAnswerScreen(this.answer);
	}
	
	static runOperation(operation:string):void{
		let value= parseFloat(this.screenValue);
		if(operation=='add'){
			this.answer+= value;
		}
		if(operation=='minus'){
			this.answer-= value;
		}
		if(operation=='times'){
			this.answer*= value;
		}
		if(operation=='divide'){
			this.answer/= value;
		
			if(this.answer==Infinity ){
				this.previousSymbol= '';
				this.setAnswerScreen();
			}
		}
		
	}

	static calculate(operation:string):void{
		if(this.screenValue==''){
			this.previousSymbol= operation;
			this.setAnswerScreen();
			return;
		}	
		if(this.step== 'enter first number'){
			this.answer= parseFloat(this.screenValue);
			this.previousSymbol= operation;
			this.step= 'enter second number';
		}
		else if(this.step== 'enter second number'){	
			this.runOperation(this.previousSymbol);
			this.previousSymbol= operation;
			this.step='repeat';
		}
		else if(this.step== 'repeat'){
			this.runOperation(this.previousSymbol);
			this.previousSymbol= operation;
			this.step='enter second number';
		}
		this.clearScreen();
		
		if(operation=='equals'){
			this.equals();
		}
	}

	static equals():void{
			let finalAnswer=this.answer;
			this.clearAll();
			this.setMainScreen(finalAnswer);
		}

	static clearEntry():void{
		this.screenValue='';
		this.setMainScreen();
	}

	static clearAll():void{
		this.step= 'enter first number';
		this.previousSymbol='';
		this.answer=0;
		this.clearEntry();
		this.setAnswerScreen('');
	}
	
	static setMainScreen(value:number|string=this.screenValue):void{
		(<HTMLInputElement> document.getElementById('screen')).value=value+'';
	}
	
	static setAnswerScreen(value:string|number=this.answer):void{
		document.getElementById('answer').innerHTML=value+'   '+this.previousSymbol;
	}
	
	static getScreenValue(){
		return (<HTMLInputElement> document.getElementById('screen')).value;
	}
	
}