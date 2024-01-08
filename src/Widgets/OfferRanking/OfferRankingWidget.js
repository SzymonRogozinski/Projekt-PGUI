import { useState } from "react";
import { RankingSorting } from "../../ProjectEnums";
import OfferRankingElement from "./OfferRankingElement";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import dictionary from "../../Data-Containers/Dictionary.json"

export default function OfferRankingWidget({ offerRankingData }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  const [rankingFilter, setRankingFilter] = useState(RankingSorting.MostBuyed);
  let ord = offerRankingData;
  const isActive = ord != null && ord.length !== 0;
  const nav = useNavigate();
  if (isActive) {
    ord.sort(rankingFilter === RankingSorting.MostBuyed ? compareMb : compareLb);

    if (ord.length > 5) {
      ord = ord.slice(0, 5);
    }
  }
  return (
    <div className="widget" id="offerRankingWidget">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="widget-header">{dictionary[lang].OfferRanking.offerRank}</span>
        <div>
          <button
            className={
              "btn-tertiary b-pos " +
              (rankingFilter === RankingSorting.LeastBuyed ? "selected" : "")
            }
            onClick={() => setRankingFilter(RankingSorting.LeastBuyed)}
          >
            {dictionary[lang].OfferRanking.leastBuy}
          </button>
          <button
            className={
              "btn-tertiary b-pos " +
              (rankingFilter === RankingSorting.MostBuyed ? "selected" : "")
            }
            onClick={() => setRankingFilter(RankingSorting.MostBuyed)}
          >
            {dictionary[lang].OfferRanking.mostBuy}
          </button>
        </div>
      </div>
      <div className="widget-content">
        {isActive ? (
              <div className="review-elements-wrapper">
                {ord.map((e, i) => (
                    <div key={"ord" + i}>
                      <OfferRankingElement offerData={e} filterMode={rankingFilter}/>
                      {getSpacer(i, ord.length)}
                    </div>
                ))}
              </div>
        ) : (
            <div className="widget-content inactive-widget-content">
              <span className="text-hdg">{dictionary[lang].OfferRanking.noOffersHdg}</span>
              <span>
              {dictionary[lang].OfferRanking.comm}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function getSpacer(i, len) {
  if (i < len - 1) {
    return <div style={{ height: "11px" }} />;
  }
}

function compareMb(o1, o2) {
  if (o1.soldUnits == o2.soldUnits) {
    return o2.turnover - o1.turnover;
  }
  return o2.soldUnits - o1.soldUnits;
}

function compareLb(o1, o2) {
  if (o1.soldUnits == o2.soldUnits) {
    return o2.viewsCount - o1.viewsCount;
  }
  return o1.soldUnits - o2.soldUnits;
}
