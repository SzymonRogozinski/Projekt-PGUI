import {useState} from "react";
import {ReviewFilterMode} from "../../ProjectEnums";
import BuyerReviewElement from "./BuyerReviewElement";
import {useNavigate} from "react-router-dom";

export default function BuyerReviewWidget({buyerReviewsList}) {
    const [reviewsFilter, setReviewsFilter] = useState(ReviewFilterMode.All);
    let brl = buyerReviewsList;
    const nav = useNavigate();
    const isActive = brl != null && brl.length != 0;
    if (isActive) {
        if (reviewsFilter != ReviewFilterMode.All) {
            brl = brl.filter((e) => e.type === reviewsFilter);
        }

        if (brl.length > 5) {
            brl = brl.slice(0, 5);
        }
    }
    return (
        <div className="widget" id="buyerReviewWidget">
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <span className="widget-header">Opinie kupujących</span>
                <div>
                    <button
                        className={
                            "btn-tertiary b-pos " +
                            (reviewsFilter === ReviewFilterMode.Positive ? "selected" : "")
                        }
                        onClick={() => setReviewsFilter(ReviewFilterMode.Positive)}
                    >
                        pozytywne
                    </button>
                    <button
                        className={
                            "btn-tertiary b-neg " +
                            (reviewsFilter === ReviewFilterMode.Negative ? "selected" : "")
                        }
                        onClick={() => setReviewsFilter(ReviewFilterMode.Negative)}
                    >
                        negatywne
                    </button>
                    <button
                        className={
                            "btn-tertiary b-all " +
                            (reviewsFilter === ReviewFilterMode.All ? "selected" : "")
                        }
                        onClick={() => setReviewsFilter(ReviewFilterMode.All)}
                    >
                        wszystkie
                    </button>
                </div>
            </div>
            <div className="widget-content">
                {isActive ? (<>
                        <div className="review-elements-wrapper">
                            {brl.map((e, i) => (
                                <div key={"ord" + i}>
                                    <BuyerReviewElement buyerReview={e}/>
                                    {getSpacer(i, brl.length)}
                                </div>
                            ))}
                        </div>

                        <button className="btn-tertiary b-pos" style={{marginTop: "10px", alignSelf: "end"}}
                                onClick={() => nav("/reviews")}>Zobacz wszystkie
                        </button>
                    </>
                ) : (
                    <div className="widget-content inactive-widget-content">
                        <span className="text-hdg">Brak opinii kupujących</span>
                        <span>Tu pojawią się opinie kupujących</span>
                    </div>
                )}
            </div>
        </div>
    );
}

function getSpacer(i, len) {
    if (i < len - 1) {
        return <div style={{height: "11px"}}/>;
    }
}
