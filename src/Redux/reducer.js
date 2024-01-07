import AppState from "../Data-Containers/AppState/AppState";
import AppData from "../Data-Containers/AppData/AppData";
import {Themes} from "../ProjectEnums";
import appStore from "./store";

export const initialState = {
    appState: new AppState(),
    appData: new AppData()
};

export function appReducer(state, action) {
    if (action?.type === "toggle-theme") {
        let appState = state.appState;
        appState.selectedTheme = appState.selectedTheme === Themes.Dark ? Themes.Light : Themes.Dark;
        return {
            ...state,
            appState: appState
        }
    }
    if (action?.type === "select_profile") {
        let appState = state.appState;
        if (action?.id == null) {
            appState.selectedProfile = state.appData.userProfiles[0];
        } else {
            appState.selectedProfile = state.appData.userProfiles.filter(p => p.id == action?.id)[0];
        }
        let ns = structuredClone(appState);
        return {
            ...state,
            appState: ns
        }

    }
    return state;
}
