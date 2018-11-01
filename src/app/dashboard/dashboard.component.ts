import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {faSync} from '@fortawesome/free-solid-svg-icons';
import {RestService} from '../services/restservice.interface';
import {RatePerMonth, TotalPerCustomer} from '../services/statisticsrestserviceimpl.class';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  chartRatePerMonth = [];
  chartTotalPerCustomer = [];
  year: number = (new Date()).getFullYear();
  faSync = faSync;

  labelTotalInvoiced: string [];
  labelRatePerMonth: string;
  labelDayPerMonth: string;


  constructor(
    @Inject(RatePerMonth) private ratePerMonthService: RestService,
    @Inject(TotalPerCustomer) private totalPerCustomer: RestService,
    private translate: TranslateService) {
  }


  loadLabels() {
    this.labelTotalInvoiced = [this.translate.instant('page.dashboard.legend.totalInvoiced')];
    this.labelRatePerMonth = this.translate.instant('page.dashboard.legend.ratePerMonth');
    this.labelDayPerMonth = this.translate.instant('page.dashboard.legend.daysPerMonth');
  }

  loadCharts() {
    this.loadLabels();
    this.initChartRatePerMonthForYear(this.year);
    this.initChartTotalPerCustomer();
  }

  ngOnInit() {
    this.translate.use(this.translate.currentLang || this.translate.getBrowserLang());
    this.loadCharts();
    this.translate.onLangChange
      .pipe(untilComponentDestroyed(this))
      .subscribe((event: LangChangeEvent) => {
        this.translate.use(event.lang);
        this.loadCharts();
      });
  }

  ngOnDestroy() {
    console.log('destroyed');
  }

  initChartTotalPerCustomer() {
    var labels = [];
    var datas = [];

    this.totalPerCustomer.get({}, (data: { key: any, value: number }) => {
      datas = Object.values(data[0]);
      //datas.push(Object.values(data[1]));
      labels = Object.keys(data[0]);
      console.log(labels);
      //labels.push(Object.keys(data[1]));
      this.chartTotalPerCustomer = this.createOneLineChart('totalPerCustomer',
        this.labelTotalInvoiced,
        datas, labels);
    });
  }

  initChartRatePerMonthForYear(year: number) {
    this.translate.get('common.calendar.labels')
      .subscribe(calendarLabels => {
        this.ratePerMonthService.get({year: year}, (data) => {
          console.log(data);
          this.chartRatePerMonth = this.createTwoLineChart('ratePerMonth',
            this.labelRatePerMonth,
            this.labelDayPerMonth, data[0], data[1], calendarLabels);
        });
      });
  }

  createOneLineChart(chartId: string, label: string[], line: any[], labels: any[]) {

    return new Chart(chartId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: line,
          yAxisID: '1',
          backgroundColor: 'rgba(255,99,132,1)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            id: '1',
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createTwoLineChart(chartId: string, label1: string, label2: string, line1: any[], line2: any[], labels: any[]) {

    return new Chart(chartId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: label1,
          data: line1,
          type: 'line',
          yAxisID: '1',
          backgroundColor: [
            'transparent'
          ],
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        },
          {
            label: label2,
            data: line2,
            yAxisID: '2',
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          yAxes: [{
            id: '1',
            ticks: {
              beginAtZero: true
            }
          }, {
            id: '2',
            ticks: {
              beginAtZero: true
            },
            gridLines: {display: false}
          }]
        }
      }
    });
  }

  reloadChart() {
    if (!isNaN(this.year)) {
      this.initChartRatePerMonthForYear(this.year);
    }
  }
}
