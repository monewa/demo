
import {Injectable} from '@angular/core'

export class Person{
	
	constructor(public id?:Number, public name?:String, public age?:Number){ }
	
	
	static meals=0
	static eat(){
		this.meals++
	}
	static getMeals(){
		return this.meals
	}
}

@Injectable()
export class StaticDataSource_Repository{

	constructor(){  }
	
	ngOnInit(){
	//	this.people[1].isSelected=true
//	 this.getPerson().isSelected=true
	}
	
	 
	lotteryNumbers= [21, 34, 56, 47, 10]
	findNumber=(n:number):boolean=> {return n<30	}
	
	getNumber= ():number|undefined=> {
		return this.lotteryNumbers.find(this.findNumber)
	}
	
	getNumbers= ():number[]=> {return this.lotteryNumbers}
	
	shopList=['tin', 'dry', 'fresh', 'drinks', 'free']
	getShoplist= ():string[]=> {return this.shopList}
	
	findItem= (i:string):boolean=> {return i=='dry'}
	getShopItem= ():string=> { return this.shopList.find(this.findItem) || 'no item' }
	
	getShopItemByLetter(firstletter:string= 'd'):string{
		for(let i of this.shopList){
			if(i.charAt(0)==firstletter){
				return i
			}
		}
		return 'no item'
	}
	
	getShopItemBySearchterm(searchterm:string= 'r'):string{
		for(let i of this.shopList){
			if(i.includes(searchterm)){
				return i
			}
		}
		return 'no item'
	}
	
	people:Person[]=[new Person (1, 'jack', 32), 
								 new Person (2, 'hosa', 12)	,
								 new Person (3, 'boza', 21),	
								 new Person (4, 'nosi', 57)]
	
	getPeople= ():Person[]=> {return this.people}
	
	getPerson(id:number=2):Person|undefined{
		for(let p of this.people){
			if(p.id==id){
				return p
			}
		}
		return undefined
	}
	
	selectPerson(){
		return true
	}
}
	
	