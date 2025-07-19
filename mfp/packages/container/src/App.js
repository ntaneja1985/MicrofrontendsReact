import React,{lazy,Suspense, useState} from 'react';

import Header from "./components/Header";
import Progress from "./components/Progress";
import {BrowserRouter, Route,Switch} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
    //Rather than generating classNames with prefix of jss, generate them with prefix of 'co'
    productionPrefix: 'co'
});


export default () =>{
    const [isSignedIn, setIsSignedIn] = React.useState(false);
    return <>
        <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
            <div>
        <Header onSignOut={()=>{setIsSignedIn(false)}} isSignedIn={isSignedIn} />
                <Suspense fallback={<Progress/>}>
        <Switch>
                <Route path="/auth">
                    <AuthLazy onSignIn = {()=> setIsSignedIn(true)}/>
                </Route>
            <Route path="/" component={MarketingLazy} />
        </Switch>
                </Suspense>
            </div>
        </BrowserRouter>
            </StylesProvider>
    </>
}