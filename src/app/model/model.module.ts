
import {NgModule} from '@angular/core'
import {ContactRepository} from './contact.repository'
import {StaticData} from './static.datasource'
import {Contact} from './contact.model'
import {HttpClientModule} from '@angular/common/http';
import {JsonData} from './rest.datasource'

const MODELSERVICES= [ContactRepository, Contact, StaticData, JsonData]

@NgModule({//, {provide:StaticData, useClass:JsonData}
	providers:[MODELSERVICES],
	imports:[HttpClientModule]						
})

export class ModelModule { }