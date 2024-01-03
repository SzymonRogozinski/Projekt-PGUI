import { useState } from "react";

export default function Header({ Profiles }) {
  let [userProfiles, setUserProfile] = useState(Profiles);
  const LanguageChangeCallback = () => {};
  const ThemeChangeCallback = () => {};
  const ProfileChangeCallback = () => {};
  return (
    <div>
      <div className="Buttons">
        <LanguageChange callback={LanguageChangeCallback} />
        <ThemeChange callback={ThemeChangeCallback} />
        <ProfileChange callback={ProfileChangeCallback} />
      </div>
    </div>
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
