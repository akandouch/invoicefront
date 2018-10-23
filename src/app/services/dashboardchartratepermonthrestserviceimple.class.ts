import { RestService } from "./restservice.interface";
import { DataService } from "./data.service";
import { Injectable } from "@angular/core";
import { RestServiceAbstract } from "./restserviceabstract.class";
import { RestPath } from "./restpath.class";

@Injectable({providedIn:"root"})
export class DashboardChartRatePerMonthServiceImpl extends RestServiceAbstract {
    path: string = "statistics/ratePerMonthForYear";
}