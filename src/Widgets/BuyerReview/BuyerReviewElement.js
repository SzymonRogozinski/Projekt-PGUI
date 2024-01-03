import { useNavigate } from "react-router-dom";

export default function BuyerReviewElement({ buyerReview }) {
  let cname =
    buyerReview.type === "negative" ? "comment-negative" : "comment-positive";

  const nav = useNavigate();

  return (
    <div
      className={"buyer-review-element-wrapper " + cname}
      onClick={() => nav("/reviews?id=" + buyerReview.id)}
    >
      <span>{buyerReview.username ?? "n/a"}</span>
      <span> {buyerReview.comment ?? "(brak komentarza)"}</span>
      <span className="material-icons">
        {buyerReview.type === "negative" ? "thumb_down" : "thumb_up"}
      </span>
    </div>
  );
}
