
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {Contact} from './contact.model'

const PROTOCOL:string='http'
const PORT:string='3500'

@Injectable()
export class JsonData{
	baseUrl:string= ''
	auth_token: string=''
	
	constructor(private http:HttpClient ){
		this.baseUrl=`${PROTOCOL}://${location.hostname}:${PORT}/` //p162
	}
	
	getContacts():Observable<Contact[]>{
		return this.http.get<Contact[]>(this.baseUrl+'contactData')
	}
	
	authenticate(user: string, pass: string): Observable<any>{ //must be boolean
		return this.http.post<any>(this.baseUrl+'login', {name:user, password:pass}).pipe(map(response =>{this.auth_token= response.success? response.token : null}))
	}
	
}
