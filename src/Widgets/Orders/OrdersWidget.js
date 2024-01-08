import OrdersDiagram from "./OrdersDiagram";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import dictionary from "../../Data-Containers/Dictionary.json"

export default function OrdersWidget({ ordersData }) {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  let widgetContent;
  const nav = useNavigate();
  if (
    ordersData == null ||
    ordersData.returned + ordersData.notsent + ordersData.unpaid == 0
  ) {
    widgetContent = (
      <div
        className="widget-content"
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="text-hdg" style={{ flexFlow: "center" }}>
        {dictionary[lang].Orders.noOrders}
        </span>
        <span>{dictionary[lang].Orders.seePromo}</span>
        <br />
        <button className="primary-button">{dictionary[lang].Orders.seeSer}</button>
      </div>
    );
  } else {
    widgetContent = (
      <>
        <OrdersDiagram ordersData={ordersData} />
        <button
          className="btn-tertiary b-pos"
          style={{ marginTop: "10px", alignSelf: "end" }}
          onClick={() => nav("/orders")}
        >
          {dictionary[lang].Orders.seeAll}
        </button>
      </>
    );
  }
  return (
    <div className="widget" id="ordersWidget">
      <span className="widget-header">{dictionary[lang].Orders.orders}</span>
      <div className="widget-content">{widgetContent}</div>
    </div>
  );
}
