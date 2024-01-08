import {useSelector} from "react-redux";
import dictionary from "../Data-Containers/Dictionary.json"

export default function SalesQualityPage(){
    let appState = useSelector((state) => state.appState);
    let lang =appState.selectedLanguage;
    return (
        <div>
            <p>{dictionary[lang].SalesQualityPage.title}</p>
        </div>
    );
}