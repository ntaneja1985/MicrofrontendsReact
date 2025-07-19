import {mount} from 'dashboard/DashboardApp'
import React,{useRef,useEffect} from 'react'


export default () =>{
    const ref = useRef(null)
    //Copy of the browser history inside the container

    useEffect(()=>{
        mount(ref.current)
    },[])
    return <div ref={ref}>

    </div>
}