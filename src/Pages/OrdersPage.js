import { useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import dictionary from "../Data-Containers/Dictionary.json"

export default function OrdersPage() {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  const { search } = useLocation();
  const type = new URLSearchParams(search).get("type");

  return (
    <div>
      <p>{dictionary[lang].OrdersPage.title1Line}</p>
      <p>{dictionary[lang].OrdersPage.title2Line}{type ?? "n/a"}</p>
    </div>
  );
}
