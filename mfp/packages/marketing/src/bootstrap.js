import React  from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {createMemoryHistory, createBrowserHistory} from "history";

// Mount function to start up the app
const mount = (el,{onNavigate, defaultHistory, initialPath}) =>{
    //If default history is passed, use it or use createMemoryHistory
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });

    //Whenever the URL changes or path changes, we will call this function
    if(onNavigate){
        history.listen(onNavigate)
    }

    ReactDOM.render(
        <App history = {history}/>,
        el
    )
    
    return {
      onParentNavigate({pathName : nextPathName}){
          console.log('Container just navigated')
          //Check if the current pathName inside Memory history is not the same as pathName passed from Parent Container Application
          if(history.location.pathname !== nextPathName){
              history.push(nextPathName);
          }
      }  
    };
}
// If we are in development and in isolation
// Call mount immediately
if(process.env.NODE_ENV === "development"){
    const devRoot = document.querySelector('#_marketing-dev-root');
    if(devRoot){
        mount(devRoot,{defaultHistory: createBrowserHistory()});
    }
}

//We are running through container, and we should export the mount function
export {mount};