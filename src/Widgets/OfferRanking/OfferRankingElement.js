import { useNavigate } from "react-router-dom";
import { RankingSorting } from "../../ProjectEnums";

export default function OfferRankingElement({ offerData, filterMode }) {
  const nav = useNavigate();

  return (
    <div
      className={"buyer-review-element-wrapper comment-positive"}
      onClick={() => null}
    >
      <img className="comment-icon" src={offerData.img} />
      <span>{offerData.name ?? "n/a"}</span>
      <div className="offer-ranking-data-col">
        <span>Sprzedano:</span>
        <span>{offerData.soldUnits ?? "n/a"} szt.</span>
      </div>
      {filterMode == RankingSorting.MostBuyed ? (
        <div className="offer-ranking-data-col">
          <span>Obrót:</span>
          <span>{offerData.turnover ?? "n/a"} PLN</span>
        </div>
      ) : (
        <div className="offer-ranking-data-col">
          <span>Wyświetlenia:</span>
          <span>{offerData.viewsCount ?? "n/a"}</span>
        </div>
      )}
    </div>
  );
}
