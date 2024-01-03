
export default class SalesData {
  day;
  hour;
  turnover;
  soldUnits;
  constructor({day, hour, turnover, soldUnits}) {
    this.day = day;
    this.hour = hour;
    this.turnover = turnover;
    this.soldUnits = soldUnits;
  }

}
