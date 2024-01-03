import BuyerReview from "./BuyerReview";
import OfferRankingData from "./OfferRankingData";
import OrdersData from "./OrdersData";
import SalesData from "./SalesData";
import SalesQualityData from "./SalesQualityData";

export default class UserProfile {
  id;
  name;
  buyerReviews;
  offerRankingDatas;
  ordersDatas;
  salesDatas;
  salesQualityDatas;
  constructor(rawObj) {
    this.id = rawObj.profileId;
    this.name = rawObj.profileName;
    this.buyerReviews = rawObj.buyerReviews.map((br) =>
      br == null ? null : new BuyerReview(br)
    );
    this.offerRankingDatas = rawObj.offerRankingData.map((ord) =>
      ord == null ? null : new OfferRankingData(ord)
    );
    this.ordersDatas =
      rawObj.ordersData == null ? null : new OrdersData(rawObj.ordersData);
    this.salesDatas = rawObj.salesData.map((sd) =>
      sd == null ? null : new SalesData(sd)
    );
    this.salesQualityDatas =
      rawObj.salesQualityData == null
        ? null
        : new SalesQualityData(rawObj.salesQualityData);
  }
}
