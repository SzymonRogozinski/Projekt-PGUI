import "./styles.css";
import {useLayoutEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Header from "./Header";
import MainPage from "./MainPage";
import OrdersPage from "./Pages/OrdersPage";
import ReviewsPage from "./Pages/ReviewsPage";
import SalesQualityPage from "./Pages/SalesQualityPage";
import {useDispatch, useSelector} from "react-redux";
import LoginPage from "./Pages/LoginPage";

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

    const ProtectedPath = ({children}) => {
        return appState.authenticatedUser == null ? <Navigate to="/login"/> : children;
    }

    return (
        <div className="Root">
            <Header Profiles={appData.userProfiles} isAuthenticated={appState.authenticatedUser != null}/>
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        path="/"
                        element={<ProtectedPath><MainPage selectedProfile={appState.selectedProfile}/></ProtectedPath>}
                    />
                    <Route path="/orders" element={<ProtectedPath><OrdersPage/></ProtectedPath>}/>
                    <Route path="/reviews" element={<ProtectedPath><ReviewsPage/></ProtectedPath>}/>
                    <Route path="/salesquality" element={<ProtectedPath><SalesQualityPage/></ProtectedPath>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

