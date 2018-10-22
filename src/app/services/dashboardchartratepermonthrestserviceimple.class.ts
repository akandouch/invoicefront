import { RestService } from "./restservice.interface";

export class DashboardChartRatePerMonthServiceImpl implements RestService {
    path: string;
    constructor(){
        this.path = "statistics/ratePerMonthForYear";
    }
}