import { useLocation } from "react-router-dom";

export default function OrdersPage() {
  const { search } = useLocation();
  const type = new URLSearchParams(search).get("type");

  return (
    <div>
      <p>To jest strona zamówień</p>
      <p>Wybrano typ: {type ?? "n/a"}</p>
    </div>
  );
}
