import AppState from "../Data-Containers/AppState/AppState";
import AppData from "../Data-Containers/AppData/AppData";
import {Themes} from "../ProjectEnums";
import appStore from "./store";

export const initialState = {
    appState: new AppState(),
    appData: new AppData()
};

export function appReducer(state, action) {
    if (action?.type === "toggle theme") {
        let aS = structuredClone(state.appState);
        aS.selectedTheme=action.value;
        console.log(action.value);
        if (aS.selectedTheme === Themes.Light) {
            document.getElementById("rootHtml").className = "";
            document.getElementById("rootHtml").style.colorScheme="light";
        } else {
            document.getElementById("rootHtml").classList.add("dark-root");
            document.getElementById("rootHtml").style.colorScheme="dark";
        }
        //appState.selectedTheme = appState.selectedTheme === Themes.Dark ? Themes.Light : Themes.Dark;
        return {
            ...state,
            appState: aS
        }
    }
    else if(action?.type === "toggle language"){
        let as = structuredClone(state.appState);
        as.selectedLanguage=action.value;
        //appState.selectedTheme = appState.selectedTheme === Themes.Dark ? Themes.Light : Themes.Dark;
        return {
            ...state,
            appState: as
        }
    }
    if (action?.type === "toggle profile") {
        let as = structuredClone(state.appState);
        if (action?.value === null) {
            as.selectedProfile = state.appData.userProfiles[0];
        } else {
            //appState.selectedProfile = state.appData.userProfiles.filter(p => p.id == action?.id)[0];
            as.selectedProfile = state.appData.userProfiles.filter(p=>p.id ==action?.value)[0];
        }
        console.log(as.selectedProfile);
        return {
            ...state,
            appState: as
        }

    }
    return state;
}
