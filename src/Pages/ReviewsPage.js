import { useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import dictionary from "../Data-Containers/Dictionary.json"

export default function ReviewsPage() {
  let appState = useSelector((state) => state.appState);
  let lang =appState.selectedLanguage;
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");

  return (
    <div>
      <p>{dictionary[lang].ReviewsPage.title1Line}</p>
      {id != null ? <p>{dictionary[lang].ReviewsPage.title2Line} {id ?? "n/a"}</p> : null}
    </div>
  );
}
