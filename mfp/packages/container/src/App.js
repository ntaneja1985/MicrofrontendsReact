import React,{lazy,Suspense, useState, useEffect} from 'react';

import Header from "./components/Header";
import Progress from "./components/Progress";
import {Router, Route,Switch, Redirect} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';
import {Dashboard} from "@material-ui/icons";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
    //Rather than generating classNames with prefix of jss, generate them with prefix of 'co'
    productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () =>{
    const [isSignedIn, setIsSignedIn] = React.useState(false);

    useEffect(() => {
        if(isSignedIn){
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return (<>

        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
            <div>
        <Header onSignOut={()=>{setIsSignedIn(false)}} isSignedIn={isSignedIn} />
                <Suspense fallback={<Progress/>}>
        <Switch>
                <Route path="/auth">
                    <AuthLazy onSignIn = {()=> setIsSignedIn(true)}/>
                </Route>
            <Route path="/dashboard" >
                {!isSignedIn && <Redirect to='/' />}
                <DashboardLazy />
            </Route>
            <Route path="/" component={MarketingLazy} />
        </Switch>
                </Suspense>
            </div>
            </StylesProvider>
        </Router>

    </>)
}