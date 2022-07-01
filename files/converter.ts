
class Converter{
	constructor(){	}
	
	displayValue:string='';
	answerDisplayMesseage:string= '';
	unit1:string= '';
	unit2:string= '';
	steps:string= 'select first unit';
	//steps:string= 'type a value';
	result:number= 0;
	validNumbers:string[]= ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
	validValues:string[]= ['Delete', 'Backspace', '=', 'c', 'm'];
	periodIsFound:boolean= false
	
	restrictNumberInput(num:string):boolean{
		if(this.displayValue== '0' && num== '0'){
			return true;
		}
		if(this.periodIsFound && num== '.'){
			return true;
		}
		if(num== '.'&& !this.periodIsFound){
			this.periodIsFound= true;
		}
		if(this.steps!= 'type a value'){
			return true
		}
		if(this.displayValue.length>=15){
			return true;
		}
	}
	
	getNumberInput(num:string):void{
		if(this.restrictNumberInput(num)){
			return;
		}
		this.displayValue+=num;
		if(this.displayValue=='.'){
			this.displayValue= '0.'
		}
		this.setDisplay();
	}
	
	getValues(val:string):void{
		if(val== 'Delete'){
			this.clearAll();
		}
		if(val== 'Backspace'){
			this.clearDisplay();
		}
		if(val=='='){
			this.run('convert');
		}
		if(val=='c'){
			this.run('cm')
		}
		if(val=='m'){
			this.run('m')
		}
	}
	
	filterKeyValues(key:string):void{
		this.validNumbers.forEach((n:string)=>{
			if(n==key){
				this.getNumberInput(key);
			}
		})
		this.validValues.forEach((v:string)=>{
			if(v==key){
				this.getValues(key);
			}
		})		
	}
	
	getKeyValues():void{
		document.onkeyup= (keyEvent:KeyboardEvent)=> {
			let key= keyEvent.key;
			this.filterKeyValues(key);
		}
	}
	
	restrictRun(unit:string):boolean{
			console.log('restrictRun'+ unit)
		if(unit=='convert'){
			if(this.displayValue== '' || this.steps != 'type a value'){
				return true;
			}
		}
		if(this.unit1== unit){
			return true;
		}
	}
	
	run(unit:string):void{
		if(this.restrictRun(unit)){
			return;
		}
		if(this.steps=='select first unit'){
			this.unit1=unit;
			this.steps= 'select 2nd unit';
			this.answerDisplayMesseage= this.unit1+ ' selected';
			this.clearDisplayForNextStep();
			return;
		}
		if(this.steps== 'select 2nd unit'){
			this.unit2=unit;
			this.steps= 'type a value';
			this.answerDisplayMesseage='convert '+this.unit1 + ' to '+ this.unit2;
			this.clearDisplayForNextStep();
			return;
		}
	    if(unit== 'convert'){
			this.convert();
		}
	}
	
	doConversion():void{
		let num= parseFloat(this.displayValue);
		if(this.unit1=='cm' && this.unit2== 'm'){
			this.result= num/100;
		}
		if(this.unit1=='m' && this.unit2== 'cm'){
			this.result= num*100;
		}
		this.result= parseFloat(this.result.toPrecision(4));
	}
	
	convert():void{
		this.doConversion();
		let result= this.result+this.unit2;
		this.clearAll();
		this.setDisplay(result);
	}
	
	clearDisplayForNextStep():void{
		this.setAnswerDisplay();
		this.clearDisplay();
		this.setDisplayPlaceholder();
	}
	
	clearDisplay():void{
		this.displayValue='';
		this.periodIsFound=false;
		this.setDisplay();
	}
	
	clearAll():void{
		this.steps= 'select first unit';
		this.unit1= '';
		this.unit2= ''
		this.result= 0;
		this.displayValue='';
		this.answerDisplayMesseage='';
		this.setAnswerDisplay();
		this.setDisplay();
		this.setDisplayPlaceholder();
	}
	
	setAnswerDisplay(value:number|string=this.answerDisplayMesseage):void{
		document.getElementById('answerDisplay').innerHTML= value+'';
	}

	setDisplay(value:number|string=this.displayValue):void{
		(<HTMLInputElement>document.getElementById('display')).value= value+'';
	}
	
	setDisplayPlaceholder(value:number|string=this.steps):void{
		(<HTMLInputElement>document.getElementById('display')).placeholder= value+'';
	}
	  
}

let c= new Converter();