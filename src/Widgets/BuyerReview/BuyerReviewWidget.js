import {useState} from "react";
import {ReviewFilterMode} from "../../ProjectEnums";
import BuyerReviewElement from "./BuyerReviewElement";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import dictionary from "../../Data-Containers/Dictionary.json"

export default function BuyerReviewWidget({buyerReviewsList}) {
    let appState = useSelector((state) => state.appState);
    let lang =appState.selectedLanguage;
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
                <span className="widget-header">{dictionary[lang].BuyerReview.buyerOp}</span>
                <div>
                    <button
                        className={
                            "btn-tertiary b-pos " +
                            (reviewsFilter === ReviewFilterMode.Positive ? "selected" : "")
                        }
                        onClick={() => setReviewsFilter(ReviewFilterMode.Positive)}
                    >
                        {dictionary[lang].BuyerReview.pos}
                    </button>
                    <button
                        className={
                            "btn-tertiary b-neg " +
                            (reviewsFilter === ReviewFilterMode.Negative ? "selected" : "")
                        }
                        onClick={() => setReviewsFilter(ReviewFilterMode.Negative)}
                    >
                        {dictionary[lang].BuyerReview.neg}
                    </button>
                    <button
                        className={
                            "btn-tertiary b-all " +
                            (reviewsFilter === ReviewFilterMode.All ? "selected" : "")
                        }
                        onClick={() => setReviewsFilter(ReviewFilterMode.All)}
                    >
                        {dictionary[lang].BuyerReview.all}
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
                                onClick={() => nav("/reviews")}>{dictionary[lang].BuyerReview.seeAll}
                        </button>
                    </>
                ) : (
                    <div className="widget-content inactive-widget-content">
                        <span className="text-hdg">{dictionary[lang].BuyerReview.noOp}</span>
                        <span>{dictionary[lang].BuyerReview.thereWillBe}</span>
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
