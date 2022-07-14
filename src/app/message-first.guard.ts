import { Injectable } from '@angular/core';
import { 
	ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } 
	from '@angular/router';
import { Observable } from 'rxjs';
import {MessageComponent} from './messaging/message.component'

@Injectable({
  providedIn: 'root'
})
export class MessageFirstGuard implements CanActivate {
	constructor(private router:Router){ }
	
	private firstNavigation=true
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
		Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | 			UrlTree {
		if(this.firstNavigation){
			this.firstNavigation=false
			if(route.component != MessageComponent){
			this.router.navigateByUrl('/message')
				return false
			}
		}
    return true;
  }  
}
