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
            appState: appState,
            ...state
        }
    }
    if (action?.type === "select_profile") {
        if (action?.id != null) {
            let appState = state.appState;
            appState.selectedProfile = state.appData.userProfiles[(state.appState?.selectedProfile?.id??0)+1];
            let ns = structuredClone(appState);
            return {
                appState: ns,
                ...state
            }
        }
    }
    return state;
}
