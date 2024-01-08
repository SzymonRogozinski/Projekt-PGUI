import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import dictionary from "../../Data-Containers/Dictionary.json"

export default function BuyerReviewElement({ buyerReview }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  let cname =
    buyerReview.type === "negative" ? "comment-negative" : "comment-positive";

  const nav = useNavigate();

  return (
    <div
      className={"buyer-review-element-wrapper " + cname}
      onClick={() => nav("/reviews?id=" + buyerReview.id)}
    >
      <span>{buyerReview.username ?? dictionary[lang].BuyerReview.notAva}</span>
      <span> {buyerReview.comment ?? dictionary[lang].BuyerReview.noComm}</span>
      <span className="material-icons">
        {buyerReview.type === "negative" ? "thumb_down" : "thumb_up"}
      </span>
    </div>
  );
}
