import { RestServiceAbstract } from "./restserviceabstract.class";

export class StatisticsRestServiceImpl extends RestServiceAbstract{
    path:string="statistics";

}
export class RatePerMonth extends StatisticsRestServiceImpl{
    path:string = this.path + "/ratePerMonthForYear";
}
export class DaysPerMonth extends StatisticsRestServiceImpl {
    path:string = this.path + "/daysPerMonth";
}
export class TotalPerCustomer extends StatisticsRestServiceImpl {
    path:string = this.path + "/totalPerCustomer";
}