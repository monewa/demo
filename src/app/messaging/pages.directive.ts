import { Directive, ViewContainerRef, TemplateRef, Input, Attribute, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[pages]'
})
export class PagesDirective {

  constructor(private container:ViewContainerRef, private template:TemplateRef<Object>) { }
  
  @Input('pages')
  counter:number=0
  
  ngOnChanges(changes: SimpleChanges){
	this.container.clear()
	for(let i=0; i<this.counter; i++){
		this.container.createEmbeddedView(
						this.template, new PagesDirectiveContext(i+1))
	}
  }
  // p132
  /* print(){
	return 'pages directive'
  } */
}

class PagesDirectiveContext{
	constructor(public $implict:any){ }
	
	
}
