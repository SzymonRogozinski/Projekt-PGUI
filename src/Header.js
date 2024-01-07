import { useState } from "react";
import { Languages, Themes } from "./ProjectEnums";
import { useSelector, useDispatch } from "react-redux";

class Choice {
  key;
  value;
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

export default function Header({ Profiles }) {
  let [userProfiles, setUserProfile] = useState(Profiles);
  let lang = useSelector((state) => {
    state.appState.selectedLanguage;
  });
  const LanguageChoises = [
    new Choice(Languages.English, "English 🇬🇧"),
    new Choice(Languages.Polish, "Język 🇵🇱"),
  ];
  const LanguageChangeCallback = () => {};
  let [theme, setTheme] = useState(Themes.Light);
  const ThemeChoises = [
    new Choice(Themes.Dark, "Ciemny 🌙"),
    new Choice(Themes.Light, "Motyw 🔆"),
  ];
  const ThemeChangeCallback = () => {};
  //Profil 1, Profil 2 ...
  const ProfileChangeCallback = () => {};
  return (
    <div>
      <div className="Buttons">
        <Selector
          choices={LanguageChoises}
          parameter={lang}
          actionType={"changeLanguage"}
        />
        <Selector choices={ThemeChoises} parameter={theme} />
        <ProfileChange callback={ProfileChangeCallback} />
      </div>
    </div>
  );
}

function Selector({ choices, parameter, actionType }) {
  const dispatch = useDispatch();
  let [par, setPar] = useState(parameter);
  return (
    <select
      value={par}
      onChange={(e) => {
        setPar(e.target.value);
        dispatch({ type: actionType, value: e.target.value });
      }}
    >
      {choices.map((c) => (
        <option value={c.key}>{c.value}</option>
      ))}
    </select>
  );
}

function LanguageChange({ callback }) {
  return <button onClick={callback}>Change Language</button>;
}

function ThemeChange({ callback }) {
  return <button onClick={callback}>Change Theme</button>;
}

function ProfileChange({ callback }) {
  return <button onClick={callback}>Change Profile</button>;
}
