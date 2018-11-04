import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {ItemComponent} from './item/item.component';

import {FormsModule} from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

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
import {ProductComponent} from './product/product.component';
import {ProductRestServiceImpl} from './services/productrestserviceimpl.class';
import {PaginationComponent} from './pagination/pagination.component';
import {InvoiceProfileRestServiceImpl} from './services/invoiceprofilerestserviceimpl.class';
import {ImageLoaderComponent} from './image-loader/image-loader.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HomeComponent} from './home/home.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AuthGuardService} from './authguardservice';

const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: 'invoiceprofile', component: InvoiceprofileComponent, canActivate: [AuthGuardService], data: {expectedRole: 'ADMIN'}},
  {path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuardService], data: {expectedRole: 'ADMIN'}},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService], data: {expectedRole: 'ADMIN'}},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], data: {expectedRole: 'ADMIN'}},
  {path: 'product', component: ProductComponent, canActivate: [AuthGuardService], data: {expectedRole: 'ADMIN'}},
  {path: '**', component: ErrorPageComponent}
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
    AttachmentListComponent,
    ProductComponent,
    PaginationComponent,
    ImageLoaderComponent,
    HomeComponent,
    ErrorPageComponent
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
    BsDropdownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: ProductRestServiceImpl, useClass: ProductRestServiceImpl},
    {provide: InvoiceProfileRestServiceImpl, useClass: InvoiceProfileRestServiceImpl},
    {provide: AuthGuardService, useClass: AuthGuardService},

  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
