export default function pReducer(state, action) {
  if (action?.type === "changeLanguage") {
    return {
      ...state,
      appState.selectedLanguage:action.value.
    };
  }
}
