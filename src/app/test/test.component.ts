import {Component, OnInit} from '@angular/core'
import { Person, StaticDataSource_Repository } from './person.test.model'

//const itemList=['fish', 'beans']

@Component({
	templateUrl: './test.component.html',
	selector: 'app-test',
	styleUrls:['../app.component.css', './test.component.css'],
	providers:[StaticDataSource_Repository]
	
})

export class TestComponent{
	constructor(private reposit:StaticDataSource_Repository){ }
	
	ngOnInit(){	}
	
	name=''
	headings= ['id', 'name', 'age']
	people= this.reposit.getPeople()
	person= this.reposit.getPerson(3)
	isSelected=this.reposit.selectPerson()
	
	item= this.reposit.getShopItem()
	item2= this.reposit.getShopItemByLetter('f')
	item3= this.reposit.getShopItemBySearchterm('free')
	
	numbers= this.reposit.getNumbers()
    inumber= this.reposit.getNumber()
	
	
	/* selectPerson(){
		this.reposit.getPerson()?.isSelected=true
	} */
	
	getStyle(id?:number):any{
		let age:any= this.reposit.getPerson(id)?.age 
		return {color: age<30? 'red' : 'blue',
					 fontSize: '30px',				//	 backgroundcolor: 'white',
		}
	}
					
	peopleToString(){
		//people.find()
	}
	
	runDirective(){
	
	}
	
	promiseTest='promise pending'
	promise= new Promise((resolve, reject)=> {
		setTimeout( () => { resolve('promise resolved') }, 1000 )
	})
	
	promise2= new Promise((resolve, reject)=> {
		setTimeout( ()=>{reject( 
							() => {this.promiseTest= 'promise rejected'} )} , 1000 )
	})
	
	accepted= (result:any)=>{
		this.promiseTest=result 
	}

	rejected= (result:any) =>{
		this.promiseTest=result
	}
	
	callAcceptedPromise(){
		this.promise.then(this.accepted)
	}
	
	callRejectedPromise(){
		this.promise2.catch(this.rejected)
	}
	
	value='start'
	saveValue(){
		this.value='done'
	}
	
	class1='mat-raised-button'
	style='color:hotpink'
	font=''
	pageNo:number=0
	change =true
	
	changeStyle(){
		this.class1= this.change? 'delete' : 'mat-flat-button mat-accent'
		this.style= this.change? 'color:yellow' : 'color:hotpink'
		this.font= this.change? '23px' : '12px'
		this.change=!this.change
	}
	openPage(pageNo:number){
		this.shopList.splice(this.pageNo,2)
		this.pageNo=pageNo
	}
	
	callTest= Test.call()
	test= new Test()
	test2= new Test()
	
	getTest():Test{
		return this.test;
		this.test2
		let i=0;
		i=5
	}
	
	eatMeal():void{
		Person.eat()
		Person.meals++
//	this.dude.eat()
	}
	
	meals= Person.getMeals()
	shopList= this.reposit.getShoplist()
	printList():string{
		let str=''
		this.shopList.forEach(
			(value:string, i:number )=> { str+= '  '+value} )
		return 'list '+ str
	}
	
	getList(){
		let items:string=''
		for(let s in this.shopList){
			items+= this.shopList[s]+', '
		}
		return items
	}
	
	getList2(){
		let items:string =''
		for(let s of this.shopList){
			items+= s+', '
		}
		return items
	}
//	list:[number, string]=[,] p105
	list: {[index:string]:[string, string]}={}
	getlist(){
//	beerList['beer']=['ginger', 'malt']
	
	}

}



export class Calc{
	static add(num:number, num2:number):number{
		return num+num2
	}
}



class Test{
	convert(num:string){
		//(<unknown>num)
		//(<number>num)
		return 
	}
	
	method:Function= function(){
		console.log()
		let result= Calc.add(1, 2)
	}
	
	static method2( id:number, age:number=5, ... name:string[]){ 
		let names:string[]= name
		return names+', age:'+ age+'; id:'+ id
	}
	
	static call(){
		return this.method2(7, 8, 'tt', 'yu')
	}
	
	method3(){
		let object={
			'is-done': 23.333
		} 
		let result= Calc.add(1, 2)
	}
	
	toString(){
		return 'test class'
	}

}
