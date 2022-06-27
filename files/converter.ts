
class Converter{
	constructor(){ }
	
	displayValue:string='';
	unit1:string= '';
	unit2:string= '';
	steps:string= 'select first unit'
	result:number= 0;
	
	getNumberInput(val:string):void{
		this.displayValue+=val;
		this.setDisplay()
	}
	
	run(unit:string):void{
		if(this.steps=='select first unit'){
			this.unit1=unit;
			this.steps= 'select 2nd unit';
			this.clearScreenForNextStep();
		}
		else if(this.steps== 'select 2nd unit'){
			this.clearScreenForNextStep();
			this.unit2=unit;
			this.steps= 'type value'
		}
		else if(unit== 'convert'){
		//	this.result= parseFloat(this.displayValue);
			console.log('result:'+this.result)
			this.runConvert();
			this.setDisplay(this.result);
		}
			console.log('unit1:'+this.unit1+'; unit2:'+this.unit2)

	}
	
	runConvert():void{
		let num= parseFloat(this.displayValue);
		if(this.unit1=='cm' && this.unit2== 'meter'){
			this.result= num*100;
		}
		if(this.unit1=='meter' && this.unit2== 'cm'){
			this.result= num/100;
		}
		
	}
	
	clearScreenForNextStep():void{
		this.setAnswerDisplay();
		this.clearDisplay()
		this.setDisplayPlaceholder()
	}
	
	clearDisplay():void{
		this.displayValue=''
		this.setDisplay()
	}
	
	clearAll():void{
		this.steps= 'select first unit';
		this.unit1= '';
		this.unit2= ''
		this.result= 0;
		this.displayValue='';
		this.setAnswerDisplay('');
		this.setDisplay();
		this.setDisplayPlaceholder();
	}
	
	setAnswerDisplay(value:number|string=this.result):void{
		document.getElementById('answerDisplay').innerHTML= value+' '+this.unit1 + ' to '+ this.unit2
	}

	setDisplay(value:number|string=this.displayValue):void{
		(<HTMLInputElement>document.getElementById('display')).value= value+''
	}
	
	setDisplayPlaceholder(value:number|string=this.steps):void{
		(<HTMLInputElement>document.getElementById('display')).placeholder= value+''
	}
	 
	 
}

let c= new Converter()