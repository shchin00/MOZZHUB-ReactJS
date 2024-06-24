import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Route, Routes } from 'react-router-dom'
// import { createRoot } from 'react-dom/client';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { history, store } from './store'
import * as serviceWorker from './serviceWorker';

import Dashboard from './component/Dashboard';
import MasterForm from './component/MasterForm';
import LoginForm from './component/LoginForm';
import AddMobilityForm from './component/AddMobilityForm';
import EditMobilityForm from './component/EditMobilityForm';
import CaseRecord from './component/CaseRecord';
import MovementMap from './component/MovementMap';
import UserProfile from './component/UserProfile';
import InteractiveMap from './component/interactiveMap';
import LvlThreeInteractiveMap from './component/lvlThreeInteractiveMap';

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter basename='/mozzhub' history={history}>
            <div>
                <Route exact path={'/'} component={Dashboard} />
                <Route path={'/dashboard'} component={Dashboard} />
                <Route path={'/form'} component={MasterForm} />
                <Route path={'/addMob'} component={AddMobilityForm} />
                <Route path={'/editMob'} component={EditMobilityForm} />
                <Route path={'/record'} component={CaseRecord} />
                <Route path={'/login'} component={LoginForm} />
                <Route path={'/map'} component={MovementMap} />
                <Route path={'/logout'} component={LoginForm} />
                <Route path={'/userprofile'} component={UserProfile}/>
                <Route path={'/interactivemap'} component={InteractiveMap} />
                <Route path={'/lvlThreeInteractiveMap'} component={LvlThreeInteractiveMap} />
            </div>
        </ConnectedRouter >
    </Provider>), document.getElementById('root'));

serviceWorker.register();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'semantic-ui-css/semantic.min.css';
// import { Route, Switch } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';
// import { Provider } from 'react-redux';
// import { history, store } from './store';
// import * as serviceWorker from './serviceWorker';

// import Dashboard from './component/Dashboard';
// import MasterForm from './component/MasterForm';
// import LoginForm from './component/LoginForm';
// import AddMobilityForm from './component/AddMobilityForm';
// import EditMobilityForm from './component/EditMobilityForm';
// import CaseRecord from './component/CaseRecord';
// import MovementMap from './component/MovementMap';
// import UserProfile from './component/UserProfile';
// import interactiveMap from './component/interactiveMap';

// ReactDOM.render((
//     <Provider store={store}>
//         <ConnectedRouter basename='/mozzhub' history={history}>
//             <Switch>
//                 <Route exact path='/' component={Dashboard} />
//                 <Route path='/dashboard' component={Dashboard} />
//                 <Route path='/form' component={MasterForm} />
//                 <Route path='/addMob' component={AddMobilityForm} />
//                 <Route path='/editMob' component={EditMobilityForm} />
//                 <Route path='/record' component={CaseRecord} />
//                 <Route path='/login' component={LoginForm} />
//                 <Route path='/map' component={MovementMap} />
//                 <Route path='/logout' component={LoginForm} />
//                 {/* <Route path='/userprofile' component={UserProfile} /> */}
//                 <Route path='/interactivemap' component={interactiveMap} />
//             </Switch>
//         </ConnectedRouter>
//     </Provider>
// ), document.getElementById('root'));

//serviceWorker.register();
