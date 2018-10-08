import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ItemComponent } from './item/item.component';

import {FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import {NgbModule,NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ItemListComponent } from './item-list/item-list.component';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';
import { CalendarComponent } from './calendar/calendar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { DataTableComponent } from './data-table/data-table.component';
import { MatSelectModule, MatGridListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { NoopAnimationsModule,BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    ItemComponent,
    ItemListComponent,
    InvoicePreviewComponent,
    CalendarComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FontAwesomeModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
