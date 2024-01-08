import {useDispatch, useSelector} from "react-redux";
import {Themes, Languages} from "./ProjectEnums";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import dictionary from "./Data-Containers/Dictionary.json"

class Choice {
    key;
    value;

    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

export default function Header({Profiles, isAuthenticated}) {
    let dispatch = useDispatch();
    let appState = useSelector((state) => state.appState);
    let appData = useSelector((state) => state.appData);
    let lang = appState.selectedLanguage;
    const LanguageChoises = [
        new Choice(Languages.English, "English 🇬🇧"),
        new Choice(Languages.Polish, "Polski 🇵🇱"),
    ];
    let theme = appState.selectedTheme;
    const ThemeChoises = [
        new Choice(Themes.Dark, dictionary[lang].Header.themeDark),
        new Choice(Themes.Light, dictionary[lang].Header.themeLight),
    ];
    let profile = appState.selectedProfile?.id;
    const ProfileChoises = appData.userProfiles.map((up) => (new Choice(up.id, up.name)));
    const onLogoutClick = () => isAuthenticated ? dispatch({type: "logout"}) : window.location.assign("/login#");
    return (
        <div className="Header">
            <Selector choices={LanguageChoises} parameter={lang} actionType={"toggle language"}/>
            <Selector choices={ThemeChoises} parameter={theme} actionType={"toggle theme"}/>
            {isAuthenticated ?
                <Selector choices={ProfileChoises} parameter={profile} actionType={"toggle profile"}/> : null}
            <div className="center-wrapper-col">
                {isAuthenticated ? <span
                    style={{marginBottom: "5px"}}>{dictionary[lang].Header.loggedInAs}: {appState.authenticatedUser}</span> : null}
                <button className="primary-button"
                        onClick={onLogoutClick}>{isAuthenticated ? dictionary[lang].Header.logOut : dictionary[lang].Header.logIn}</button>
            </div>
        </div>
    );
}

function Selector({choices, parameter, actionType}) {
    const dispatch = useDispatch();
    let [par, setPar] = useState(parameter);
    return (
        <select
            className="Selector"
            value={par}
            onChange={(e) => {
                setPar(e.target.value);
                dispatch({type: actionType, value: e.target.value});
            }}
        >
            {choices.map((c, i) => (
                <option className="Option" key={i} value={c.key}>{c.value}</option>
            ))}
        </select>
    );
}

