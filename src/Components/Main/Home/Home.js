import React,{useContext,useEffect,useState} from 'react'
import Feed from './Feed/Feed'
import style from './Home.module.css'
const Home = ({userData}) => {
    
    return (
        <div className={style.Home}>
            
                <Feed userData = {userData}/>
        </div>
    )
}

export default Home
