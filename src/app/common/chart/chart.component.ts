import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as $ from 'jquery';
import { StockChart } from 'angular-highcharts';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {


  @Input('name') test: string;
  stockChart: StockChart;

  add() {
  }

  itemsRef: any;
  chart: Chart;
  price: any = null;
  float: any = 0;
  volume: any = 0;
  id: string;
  img: string;
  constructor(public db: AngularFireDatabase, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = (params.get('id')).toUpperCase();

      this.img = this.getImage(this.id);



      let label = this.id.replace("-", "/");
      let volume = [];
      let price = [];
      this.itemsRef = db.list(this.id);
      let i = 0;

      this.db.database.ref(this.id).limitToLast(1).on('child_added', (res) => {
        if (i != 0) {
          if (this.chart.options.series[0].data.slice(-1)[0][0] != res.val().TimeStamp * 1000) {
            this.chart.addPoint([res.val().TimeStamp * 1000, res.val().Volume], 0, true, true);
            this.chart.addPoint([res.val().TimeStamp * 1000, res.val().Ask], 1, true, true);
            if (this.price != res.val().Ask) {
              this.price = res.val().Ask;
              this.volume = res.val().Volume.toFixed(2);
              this.float = (this.price == null ? 0 : (this.price - this.chart.options.series[1].data[0][1]) / this.price * 100).toFixed(2);


            }
            this.chart.options.series[0].data.splice(-1, 1);
            this.chart.options.series[1].data.splice(-1, 1);
          }

        }
      })


      this.itemsRef.snapshotChanges(['child_added'])
        .subscribe(actions => {
          if (i == 0) {
            actions.forEach(action => {
              // console.log(action.key);
              // console.log([action.payload.val().TimeStamp * 1000, action.payload.val().Volume]);
              if (!JSON.stringify(volume).includes(JSON.stringify([action.payload.val().TimeStamp * 1000, action.payload.val().Volume]))) {
                volume.push([action.payload.val().TimeStamp * 1000, action.payload.val().Volume]);
                price.push([action.payload.val().TimeStamp * 1000, action.payload.val().Ask]);
              }
            });
            i++;

            this.chart = new Chart({
              chart: {
                type: 'column'
              },
              title: {
                text: this.id + ' 1hr (update interval 2mins)'
              },
              xAxis: {
                type: 'datetime',
                min: 1517196502039 - 18 * 60 * 60 * 1000,
                max: 1517196502039 - 16 * 60 * 60 * 1000,
              },
              yAxis: [{ // Primary yAxis
                labels: {
                  format: '{value}',
                },
                title: {
                  text: '24h Volumn',
                }
              }, { // Secondary yAxis
                title: {
                  text: 'Price',
                },
                labels: {
                  format: '{value} ' + label,
                },
                endOnTick: true,
                opposite: true
              }],
              tooltip: {
                shared: true,
                useHTML: true,
                formatter: function () {
                  var points = '<table class="tip"><caption>Date: ' + new Date(this.x).toUTCString() + '</caption>'
                    + '<tbody>';
                  $.each(this.points, function (i, point) {
                    points += '<tr><th style="color: ' + point.series.color + '">' + point.series.name + ': </th>'
                      + '<td style="text-align: right">' + point.y + '</td></tr>'
                  });
                  return points;
                }
              },
              credits: {
                enabled: false
              },
              series: [{
                name: "VOLUME",
                data: volume.slice(-30),
                type: 'column'
              }, {
                name: "Price",
                yAxis: 1,
                data: price.slice(-30),
                type: 'line'
              },
              ]
            });
            this.price = price.slice(-1)[0][1];
            this.volume = volume.slice(-1)[0][1].toFixed(2);
            this.float = ((this.price - this.chart.options.series[1].data[0][1]) / this.price * 100).toFixed(2);
          }
        });
    });

  }

  getImage(id) {
    let text = "";
    switch (id) {
      case "USD-BTC":
        text = "https://files.coinmarketcap.com/static/img/coins/32x32/tether.png";
        break;
      case "AIB-BTC":
        text = "https://files.coinmarketcap.com/static/img/coins/32x32/advanced-internet-blocks.png";
        break;
      case "ETH-BTC":
        text = "https://files.coinmarketcap.com/static/img/coins/32x32/ethereum.png";
        break;
      case "LTC-BTC":
        text = "https://files.coinmarketcap.com/static/img/coins/32x32/litecoin.png";
        break;
      default:
        text = "Looking forward to the Weekend";


    }

    return text;
  }

  ngOnInit() {

  }

}
