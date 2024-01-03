import { useLocation } from "react-router-dom";

export default function ReviewsPage() {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");

  return (
    <div>
      <p>To jest strona opinii kupujących</p>
      {id != null ? <p>Wybrano opinię o id: {id ?? "n/a"}</p> : null}
    </div>
  );
}
