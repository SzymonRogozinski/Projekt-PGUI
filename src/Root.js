import "./styles.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import AppData from "./Data-Containers/AppData/AppData";
import AppState from "./Data-Containers/AppState/AppState";
import MainPage from "./MainPage";
import OrdersPage from "./Pages/OrdersPage";
import ReviewsPage from "./Pages/ReviewsPage";
import SalesQualityPage from "./Pages/SalesQualityPage";

export default function Root() {
  let [appData, setAppData] = useState(new AppData());
  let [appState, setAppState] = useState(new AppState());
  if (appState.selectedProfile == null) {
    setAppState((state) => {
      console.log(state);
      state.selectedProfile = appData.userProfiles[1];

      return state;
    });
  }
  return (
    <div className="Root">
      <Header Profiles={appData.userProfiles} />{" "}
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/"
            element={<MainPage selectedProfile={appState.selectedProfile} />}
          />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/salesquality" element={<SalesQualityPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  return <div />;
}
