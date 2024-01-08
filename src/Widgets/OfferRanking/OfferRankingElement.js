import { useNavigate } from "react-router-dom";
import { RankingSorting } from "../../ProjectEnums";
import {useSelector} from "react-redux";
import dictionary from "../../Data-Containers/Dictionary.json"

export default function OfferRankingElement({ offerData, filterMode }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  const nav = useNavigate();

  return (
    <div
      className={"buyer-review-element-wrapper comment-positive"}
      onClick={() => null}
    >
      <img className="comment-icon" src={offerData.img} />
      <span>{offerData.name ?? dictionary[lang].OfferRanking.notAva}</span>
      <div className="offer-ranking-data-col">
        <span>{dictionary[lang].OfferRanking.soldOut}</span>
        <span>{offerData.soldUnits ?? dictionary[lang].OfferRanking.notAva} szt.</span>
      </div>
      {filterMode == RankingSorting.MostBuyed ? (
        <div className="offer-ranking-data-col">
          <span>{dictionary[lang].OfferRanking.turnOver}</span>
          <span>{offerData.turnover ?? dictionary[lang].OfferRanking.notAva} PLN</span>
        </div>
      ) : (
        <div className="offer-ranking-data-col">
          <span>{dictionary[lang].OfferRanking.views}</span>
          <span>{offerData.viewsCount ?? dictionary[lang].OfferRanking.notAva}</span>
        </div>
      )}
    </div>
  );
}
