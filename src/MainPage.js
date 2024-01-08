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

/*
            <SalesDiagramWidget salesData={selectedProfile?.salesDatas}/>
            <br/>

            <BuyerReviewWidget buyerReviewsList={selectedProfile?.buyerReviews??[]}/>
            <br/>

            <OfferRankingWidget offerRankingData={selectedProfile?.offerRankingDatas??[]}/>
            <br/>
            <OrdersWidget ordersData={selectedProfile?.ordersDatas}/>
            <br/>

            <SalesQualityWidget salesQualityData={selectedProfile?.salesQualityDatas}/>
*/ 

export default function MainPage({selectedProfile}) {

    return (
        <div className="MainPage">
            <BuyerReviewWidget buyerReviewsList={selectedProfile?.buyerReviews??[]}/>
            <OfferRankingWidget offerRankingData={selectedProfile?.offerRankingDatas??[]}/>
            <OrdersWidget ordersData={selectedProfile?.ordersDatas}/>
            <SalesQualityWidget salesQualityData={selectedProfile?.salesQualityDatas}/>
            <SalesDiagramWidget salesData={selectedProfile?.salesDatas}/>
        </div>
    );
}
