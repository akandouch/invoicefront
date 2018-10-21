import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    chart=[];
    year:any;
    faSync = faSync; 

  constructor(private dataService:DataService) { }

  
  ngAfterViewInit(){

    this.initChartRatePerMonthForYear(2019);

  }
  ngOnInit() {
  }

  initChartRatePerMonthForYear(year:number){
    var data = [];
    var labels = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    this.dataService.getRatePerMonthForYear(year).subscribe(
     d=>this.createLineChart("Rate per Month for "+ year ,d, labels)
    );

    

  }

  createLineChart(label:string, data:any[], labels:any[]){

    this.chart = new Chart("canvas", {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: label,
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
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
