import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular5-data-table';
import stock from 'highcharts/modules/stock.src';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import { ChartModule } from 'angular-highcharts';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app.route';
import { HttpModule } from '@angular/http';









import { AppComponent } from './app.component';
import { ChartComponent } from './common/chart/chart.component';
import { TableComponent } from './common/table/table.component';
import { HomeComponent } from './home/home.component';

import { GetdataService} from './common/getdata.service';
export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock];
}

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    TableComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    FormsModule,
    CommonModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    AngularFireDatabaseModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    GetdataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
