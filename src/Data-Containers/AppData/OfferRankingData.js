export default class OfferRankingData {
  id;
  img;
  name;
  soldUnits;
  turnover;
  viewsCount;
  constructor({ id, img, name, soldUnits, turnover, viewsCount }) {
    this.img = img;
    this.name = name;
    this.soldUnits = soldUnits;
    this.turnover = turnover;
    this.viewsCount = viewsCount;
    this.id = id;
  }
}
