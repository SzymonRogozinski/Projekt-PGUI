import { Languages, Themes } from "../../ProjectEnums";
export default class AppState {
  selectedLanguage;
  selectedProfile;
  selectedTheme;
  //Default constructor
  constructor() {
    this.selectedLanguage = Languages.Polish;
    this.selectedTheme = Themes.Light;
  }
  
  set setSelectedProfile(value) {
    this.selectedProfile = value;
  }
  
}
