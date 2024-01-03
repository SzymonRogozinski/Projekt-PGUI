import {useState} from "react";
import BuyerReview from "./Data-Containers/AppData/BuyerReview";
import OfferRankingData from "./Data-Containers/AppData/OfferRankingData";
import OrdersData from "./Data-Containers/AppData/OrdersData";
import SalesData from "./Data-Containers/AppData/SalesData";
import BuyerReviewWidget from "./Widgets/BuyerReview/BuyerReviewWidget";
import OfferRankingWidget from "./Widgets/OfferRanking/OfferRankingWidget";
import OrdersWidget from "./Widgets/Orders/OrdersWidget";
import SalesDiagramWidget from "./Widgets/SalesDiagramWidget/SalesDiagramWidget";
import SalesQualityWidget from "./Widgets/SalesQuality/SalesQualityWidget";

export default function MainPage({selectedProfile}) {

    return (
        <div>
            <SalesDiagramWidget salesData={selectedProfile?.salesDatas}/>
            <br/>

            <BuyerReviewWidget buyerReviewsList={selectedProfile?.buyerReviews??[]}/>
            <BuyerReviewWidget buyerReviewsList={[]}/>
            <br/>

            <OfferRankingWidget offerRankingData={selectedProfile?.offerRankingDatas??[]}/>
            <OfferRankingWidget offerRankingData={[]}/>
            <br/>

            <OrdersWidget ordersData={selectedProfile?.ordersDatas}/>
            <OrdersWidget ordersData={null}/>
            <br/>

            <SalesQualityWidget salesQualityData={selectedProfile?.salesQualityDatas}/>
            <SalesQualityWidget salesQualityData={null}/>
        </div>
    );
}
