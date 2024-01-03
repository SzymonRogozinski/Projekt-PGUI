import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import Root from "./Root";
import appStore from "./Redux/store";
import {Provider} from "react-redux";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <Provider store={appStore}>
            <Root/>
        </Provider>
    </StrictMode>
);
