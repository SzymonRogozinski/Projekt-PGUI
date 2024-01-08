import {useDispatch, useSelector} from "react-redux";
import {Themes,Languages} from "./ProjectEnums";
import {useState} from "react";
import { Link } from "react-router-dom";
import dictionary from "./Data-Containers/Dictionary.json"

class Choice {
    key;
    value;
    constructor(key, value) {
      this.key = key;
      this.value = value;
    }
  }

export default function Header({Profiles}) {
    let dispatch = useDispatch();
    let appState = useSelector((state) => state.appState);
    let appData=useSelector((state) => state.appData);
    let lang =appState.selectedLanguage;
    const LanguageChoises = [
        new Choice(Languages.English, "English 🇬🇧"),
        new Choice(Languages.Polish, "Polski 🇵🇱"),
      ];
    let theme = appState.selectedTheme;
    const ThemeChoises = [
        new Choice(Themes.Dark, dictionary[lang].Header.themeDark),
        new Choice(Themes.Light, dictionary[lang].Header.themeLight),
    ];
    let profile= appState.selectedProfile?.id;
    const ProfileChoises = appData.userProfiles.map((up)=>(new Choice(up.id,up.name)));
    return (
        <div className="Header"> 
            <Selector choices={LanguageChoises} parameter={lang} actionType={"toggle language"}/>
            <Selector choices={ThemeChoises} parameter={theme} actionType={"toggle theme"}/>
            <Selector choices={ProfileChoises} parameter={profile} actionType={"toggle profile"}/>
            <p>{dictionary[lang].Header.logIn}</p>
        </div>
    );
}

function Selector({ choices, parameter, actionType }) {
    const dispatch = useDispatch();
    let [par, setPar] = useState(parameter);
    return (
      <select
      className="Selector"
        value={par}
        onChange={(e) => {
          setPar(e.target.value);
          dispatch({ type: actionType, value: e.target.value });
        }}
      >
        {choices.map((c,i) => (
          <option className="Option" key={i} value={c.key}>{c.value}</option>
        ))}
      </select>
    );
  }

function LanguageChange({callback}) {
    return <button onClick={callback}>Change Language</button>;
}

function ThemeChange({callback}) {
    return <button onClick={callback}>Change Theme</button>;
}

function ProfileChange({callback}) {
    return <button onClick={callback}>Change Profile</button>;
}
