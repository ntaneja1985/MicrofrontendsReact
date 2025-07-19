import {mount} from 'auth/AuthApp'
import React,{useRef,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

export default ({onSignIn}) =>{
    const ref = useRef(null)
    //Copy of the browser history inside the container
    const history = useHistory()
    useEffect(()=>{
        const {onParentNavigate} = mount(ref.current,{
            initialPath: history.location.pathname,
            onSignIn,
            onNavigate : ({pathName : nextPathName})=> {
                console.log(nextPathName);
                console.log('The container noticed navigation in Auth App')
                //Check if the current pathName inside Browser history is not the same as pathName passed from Marketing Application
                if(history.location.pathname !== nextPathName){
                    //Update history object of Container App
                    history.push(nextPathName);
                }
            },
        })

        history.listen(onParentNavigate);
    },[])
    return <div ref={ref}>

    </div>
}