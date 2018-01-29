import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';
  content= "";
  list = ["ETH-BTC", "AIB-BTC", "LTC-BTC", "USD-BTC"];
  onInput(){
    this.list =["ETH-BTC", "AIB-BTC", "LTC-BTC", "USD-BTC"].filter(word => {
      return word.toLowerCase().indexOf(this.content.toLowerCase()) > -1
    }
    );

  }

  reset(){
    this.content= "";
  }
}
