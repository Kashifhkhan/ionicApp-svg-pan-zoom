import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()

export class ConfigService {
    constructor(public http: HttpClient){}
    
    configURL = 'assets/data/floormap.json';

    getFloorData(){
        return this.http.get(this.configURL);
    }
}