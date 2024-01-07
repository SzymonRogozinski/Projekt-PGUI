import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Root from "./Root";
import pStore from "./Context/PStore";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={pStore}>
      <Root />
    </Provider>
  </StrictMode>,
);
