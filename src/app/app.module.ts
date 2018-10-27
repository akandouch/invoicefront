import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {ItemComponent} from './item/item.component';

import {FormsModule} from '@angular/forms';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ItemListComponent} from './item-list/item-list.component';
import {InvoicePreviewComponent} from './invoice-preview/invoice-preview.component';
import {CalendarComponent} from './calendar/calendar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DataTableComponent} from './data-table/data-table.component';
import {MatGridListModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {InvoiceprofileComponent} from './invoiceprofile/invoiceprofile.component';
import {Route, RouterModule} from '@angular/router';
import {SettingsComponent} from './settings/settings.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {InvoiceRestServiceImpl} from './services/invoicerestserviceimpl.class';
import {DashboardChartRatePerMonthServiceImpl} from './services/dashboardchartratepermonthrestserviceimple.class';
import {UploadRestServiceImpl} from './services/uploadrestserviceimpl.class';
import {AttachmentListComponent} from './attachment-list/attachment-list.component';
import {InvoiceSendMailRestServiceImpl} from './services/invoicesendmailrestserviceimpl.class';
import {DaysPerMonth, RatePerMonth, TotalPerCustomer} from './services/statisticsrestserviceimpl.class';
import {AuthInterceptor} from './authinterceptor';
import {ErrorInterceptor} from './errorinterceptor';
import {AuthenticationService} from './authenticationservice';


const routes: Route[] = [
  {path: '', component: DashboardComponent},
  {path: 'invoiceprofile', component: InvoiceprofileComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    ItemComponent,
    ItemListComponent,
    InvoicePreviewComponent,
    CalendarComponent,
    DataTableComponent,
    InvoiceprofileComponent,
    SettingsComponent,
    DashboardComponent,
    AttachmentListComponent
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
    MatSortModule,
    RouterModule.forRoot(routes, {enableTracing: false})
  ],
  providers: [
    {provide: InvoiceRestServiceImpl, useClass: InvoiceRestServiceImpl},
    {provide: DashboardChartRatePerMonthServiceImpl, useClass: DashboardChartRatePerMonthServiceImpl},
    {provide: UploadRestServiceImpl, useClass: UploadRestServiceImpl},
    {provide: InvoiceSendMailRestServiceImpl, useClass: InvoiceSendMailRestServiceImpl},
    {provide: RatePerMonth, useClass: RatePerMonth},
    {provide: DaysPerMonth, useClass: DaysPerMonth},
    {provide: TotalPerCustomer, useClass: TotalPerCustomer},
    {provide: AuthenticationService, useClass: AuthenticationService},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
