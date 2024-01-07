import {useDispatch, useSelector} from "react-redux";
import {Themes} from "./ProjectEnums";
import {useState} from "react";

export default function Header({Profiles}) {
    let dispatch = useDispatch();
    let appState = useSelector((state) => state.appState);
    // remove this:
    let [i, setI] = useState(2);

    const LanguageChangeCallback = () => {
    };
    const toggleThemeCallback = () => {
        if (appState.selectedTheme === Themes.Dark) {
            document.getElementById("rootHtml").className = "";
            document.getElementById("rootHtml").style.colorScheme="light";
        } else {
            document.getElementById("rootHtml").classList.add("dark-root");
            document.getElementById("rootHtml").style.colorScheme="dark";
        }
      dispatch({type: "toggle-theme"});
    };
    const ProfileChangeCallback = () => {
        setI(i+1);
        dispatch({type:"select_profile", id: i});
    };
    return (
        <div>
            <div className="Buttons">
                <LanguageChange callback={LanguageChangeCallback}/>
                <ThemeChange callback={toggleThemeCallback}/>
                <ProfileChange callback={ProfileChangeCallback}/>
            </div>
            <span>{appState?.selectedProfile?.name??"n/a"}</span>
        </div>
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
