import "./styles.css";
import {useLayoutEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./Header";
import AppData from "./Data-Containers/AppData/AppData";
import AppState from "./Data-Containers/AppState/AppState";
import MainPage from "./MainPage";
import OrdersPage from "./Pages/OrdersPage";
import ReviewsPage from "./Pages/ReviewsPage";
import SalesQualityPage from "./Pages/SalesQualityPage";
import {Themes} from "./ProjectEnums";
import {useDispatch, useSelector} from "react-redux";

export default function Root() {
    /*
    * TU JEST COŚ NIE TAK - PRZY ZMIANIE PROFILU SIĘ NIE RELOADUJE
    * */
    let appData = useSelector((state) => state.appData);
    let appState = useSelector((state) => state.appState);
    let dispatch = useDispatch();

    if (appState.selectedProfile == null) {
        dispatch({type: "select_profile"});
    }
    
    return (
        <div className="Root">
            <Header Profiles={appData.userProfiles}/>{" "}
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        path="/"
                        element={<MainPage selectedProfile={appState.selectedProfile}/>}
                    />
                    <Route path="/orders" element={<OrdersPage/>}/>
                    <Route path="/reviews" element={<ReviewsPage/>}/>
                    <Route path="/salesquality" element={<SalesQualityPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

function Layout() {
    return <div/>;
}
