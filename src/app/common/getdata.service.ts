import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class GetdataService {

  constructor(public http:Http) { }

  getdata(array){
    this.http.get('https://c-cex.com/t/api_pub.html?a=getmarketsummaries').subscribe(data => {
      console.log(data);
    });
  }


}
