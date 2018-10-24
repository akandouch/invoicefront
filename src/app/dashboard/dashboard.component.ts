import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../services/data.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { DashboardChartRatePerMonthServiceImpl } from '../services/dashboardchartratepermonthrestserviceimple.class';
import { RestService } from '../services/restservice.interface';
import { InvoiceRestServiceImpl } from '../services/invoicerestserviceimpl.class';
import { RatePerMonth } from '../services/statisticsrestserviceimpl.class';
import { strictEqual } from 'assert';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    chart=[];
    year:number = (new Date()).getFullYear();
    faSync = faSync;

  constructor(@Inject(RatePerMonth)private ratePerMonthService:RestService) {
   }

  
  ngAfterViewInit(){

    this.initChartRatePerMonthForYear(this.year);

  }
  ngOnInit() {
  }

  initChartRatePerMonthForYear(year:number){
    var dataset = [{
        label:"rate",
        yAxesId:"r",
        data:[]
    }];
    var labels = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    this.ratePerMonthService.get({year:year},(data)=>{
        console.log(data);


        this.createLineChart("Rate per Month" ,"Days per Month" ,data[0],data[1], labels)
    });
    
  }

  createLineChart(label1:string,label2:string, line1:any[], line2:any[], labels:any[]){

    this.chart = new Chart("canvas", {
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
            yAxisID : '2',
            borderWidth: 1
        }]
          },
          options: {
              scales: {
                  yAxes: [{
                      id:'1',
                      ticks: {
                          beginAtZero:true
                      }
                  },{
                    id:'2',
                    ticks: {
                        beginAtZero:true
                    },
                    gridLines:{display:false}
                }]
              }
          }
      });
  }
  reloadChart(){
    if(!isNaN(this.year)){
      this.initChartRatePerMonthForYear(this.year);
    }
  }
}
