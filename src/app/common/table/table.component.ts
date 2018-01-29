import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  itemResource = null;
  items = [];
  itemCount = 0;
  data = [];
  ngOnInit() {
  }

  constructor(public db: AngularFireDatabase, public router: Router) {
    let array = ["ETH-BTC", "AIB-BTC", "LTC-BTC", "USD-BTC"];

    for (let i of array) {
      this.db.database.ref(i).limitToLast(1).on('child_added', (res) => {
        if (this.data.length == 4) {
          this.data = [];
        }
        this.data.push(res.val());
      })
    }

    this.itemResource = new DataTableResource(this.data);
    

    let time = setInterval(() => {

      this.reloadItems(1);
      
      if (this.data.length == 4) {
        this.itemResource.count().then(count => this.itemCount = count);
        clearInterval(time);
      }
    }, 2000);


  }

  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  // special properties:
  rowClick(rowEvent) {
    this.router.navigate(['/detail', rowEvent.row.item.MarketName]);
  }

  rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) {
    return item.jobTitle;
  }



}
