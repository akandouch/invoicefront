import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  public label: string;
  public status: string;
  public message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    console.log(this.route.queryParamMap);
    this.route
      .queryParams
      .subscribe(params => {
        console.log(params.length);
        this.label = params['label'] || this.label;
        this.status = params['status'] || this.status;
        this.message = params['message'] || this.message;
      });
  }

}
