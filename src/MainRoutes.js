import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import MasterForm from './component/MasterForm';
import LoginForm from './component/LoginForm';
import MobilityForm from './component/MobilityForm';
import CaseRecord from './component/CaseRecord';
import MovementMap from './component/MovementMap';
import UserProfile from './component/UserProfile';
import interactiveMap from './component/interactiveMap';
import TestFunc from './component/test';


function MainRoutes() {

    const [token, setToken] = useState();
    const x = 1;
    if (x) {
        return (<LoginForm setToken={setToken} />);
    }


    return (
        <BrowserRouter>
            <div>
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Dashboard} />
                <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />
                <Route path={`${process.env.PUBLIC_URL}/form`} component={MasterForm} />
                <Route path={`${process.env.PUBLIC_URL}/mob`} component={MobilityForm} />
                <Route path={`${process.env.PUBLIC_URL}/record`} component={CaseRecord} />
                <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginForm} />
                <Route path={`${process.env.PUBLIC_URL}/map`} component={MovementMap} />
                <Route path={`${process.env.PUBLIC_URL}/userprofile`} component={UserProfile}/>
                <Route path={`${process.env.PUBLIC_URL}/interactivemap`} component={interactiveMap} />
                <Route path={`${process.env.PUBLIC_URL}/test`} component={TestFunc} />
            </div>
        </BrowserRouter>
    )

}
export default MainRoutes;