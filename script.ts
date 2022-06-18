
class Calc{

	static answer:number=0
	static answerStr:string=''
	static screen2:HTMLElement= (<HTMLInputElement> document.getElementById('screen'))
	static screen:HTMLElement= document.getElementById('screen')

	static input(num:string){
		Calc.answerStr+=num;
		this.setMainScreen(Calc.answerStr);
	}
	
/* 	static inputKey(num:string){
		Calc.answerStr+=num;
		this.setMainScreen(Calc.answerStr);
	} */
	
	static clearScreen():void{
		(<HTMLInputElement> document.getElementById('screen')).value='';
		Calc.answerStr='';
		this.setMainScreen('')
	}

	static clearAll():void{
		Calc.answerStr='';
		Calc.answer=0;
		this.setMainScreen('');
		this.setAnswerScreen();
	}

/* 	static consoleLog(log:any){
		document.getElementById('console').innerHTML=log+''
	} */
	
	static calculate(operation:string):void{
		let screenValue= (<HTMLInputElement> document.getElementById('screen')).value
		if(operation=='+'){
			Calc.answer+= parseInt(screenValue);
		}
		if(operation=='-'){
			Calc.answer-= parseInt(screenValue);
		}
		if(operation=='x'){
			Calc.answer*= parseInt(screenValue);
		}
		if(operation=='/'){
			Calc.answer/= parseInt(screenValue);
		}
		
		Calc.answerStr='0';
		this.setMainScreen('');
		this.setAnswerScreen();
	}

	static setMainScreen(num:string|number):void{
		(<HTMLInputElement> document.getElementById('screen')).value=num+'';
	}
	
	static setAnswerScreen():void{
		document.getElementById('answer').innerHTML=Calc.answer+'';
	}


}