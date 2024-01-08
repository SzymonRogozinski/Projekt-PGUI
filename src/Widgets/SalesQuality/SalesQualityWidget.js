import PercentIndicator from "./PercentIndicator";
import AspectLabel from "./AspectLabel";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import dictionary from "../../Data-Containers/Dictionary.json"

export default function SalesQualityWidget({ salesQualityData }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;

  let widgetContent;
  const nav = useNavigate();

  if (salesQualityData != null) {
    widgetContent = (
      <div className="widget-content">
        <div
          style={{
            flex: 1,
            alignSelf: "center",
          }}
        >
          <PercentIndicator percentLevel={salesQualityData.percentLevel} />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: 30,
              fontWeight: 500,
            }}
          >
            {salesQualityData.category}
          </span>
          <br />
          <span style={{ marginBottom: 5 }}>{dictionary[lang].SalesQuality.worstAsp}</span>
          {salesQualityData.worstAspects.map((asp, i) => {
            return (
              <AspectLabel
                Aspekt={asp.name}
                PercentLevel={asp.level}
                key={"asp" + i}
              />
            );
          })}
          <button
            className="btn-tertiary b-pos"
            style={{ marginTop: "10px" }}
            onClick={() => nav("/salesquality")}
          >
            {dictionary[lang].SalesQuality.seeMore}
          </button>
        </div>
      </div>
    );
  } else {
    widgetContent = (
      <div className="widget-content inactive-widget-content">
        <span className="text-hdg">{dictionary[lang].SalesQuality.reviewNot}</span>
        <span>{dictionary[lang].SalesQuality.comm}</span>
      </div>
    );
  }

  return (
    <div className="widget" id="salesQualityWidget">
      <span className="widget-header">{dictionary[lang].SalesQuality.sellQ}</span>
      {widgetContent}
    </div>
  );
}
