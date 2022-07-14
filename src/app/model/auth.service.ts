import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {JsonData} from './rest.datasource'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private datasource:JsonData) { }
  //p173
  authenticate(username:string, password:string):Observable<boolean>{
	return this.datasource.authenticate(username, password)
}
  
}

import { FormControl, FormGroup, Validators } from "@angular/forms";
export class ProductFormControl extends FormControl {
label: string;
modelProperty: string;
constructor(label:string, property:string, value: any, validator: any) {
super(value, validator);
this.label = label;
this.modelProperty = property;
}
}
