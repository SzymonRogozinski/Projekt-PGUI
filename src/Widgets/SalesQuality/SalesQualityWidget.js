import PercentIndicator from "./PercentIndicator";
import AspectLabel from "./AspectLabel";
import { useNavigate } from "react-router-dom";

export default function SalesQualityWidget({ salesQualityData }) {
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
          <span style={{ marginBottom: 5 }}>Najgorsze aspekty:</span>
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
            Zobacz więcej
          </button>
        </div>
      </div>
    );
  } else {
    widgetContent = (
      <div className="widget-content inactive-widget-content">
        <span className="text-hdg">Ocena jakości niedostępna</span>
        <span>Tu pojawi się ocena jakości Twojej sprzedaży</span>
      </div>
    );
  }

  return (
    <div className="widget" id="salesQualityWidget">
      <span className="widget-header">Jakość sprzedaży</span>
      {widgetContent}
    </div>
  );
}
