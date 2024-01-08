import OrdersDiagram from "./OrdersDiagram";
import { useNavigate } from "react-router-dom";

export default function OrdersWidget({ ordersData }) {
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
          Brak zamówień
        </span>
        <span>Przejrzyj nasze usługi promowania ofert</span>
        <br />
        <button className="primary-button">Zobacz usługi</button>
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
          Zobacz wszystkie
        </button>
      </>
    );
  }
  return (
    <div className="widget" id="ordersWidget">
      <span className="widget-header">Zamówienia</span>
      <div className="widget-content">{widgetContent}</div>
    </div>
  );
}
