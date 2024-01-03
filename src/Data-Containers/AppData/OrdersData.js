export default class OrdersData {
  returned;
  notsent;
  unpaid;
  constructor({returned, notsent, unpaid}) {
    this.returned = returned;
    this.notsent = notsent;
    this.unpaid = unpaid;
  }
}
