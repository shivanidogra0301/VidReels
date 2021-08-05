import  style from './Main.module.css'
import React,{useContext,useState,useEffect} from 'react'
import Home from './Home/Home'
import { database } from '../../firebase'
import { AuthContext } from '../../Context/AuthProvider'
import Suggestion from './Suggestions/Suggestion'
import Menu from './Menu/Menu'
import { CircularProgress } from '@material-ui/core'
const Main = () => {
    const {curUser} =useContext(AuthContext);
    const [userData,setUserData] = useState(null);
    // console.log(curUser);
    /*whenever curUser get changed this function will be called, curUser contains user id, to get data
    of that user onSnapshot is called it is a eventListeer which is called everytime there is change
    in the data i.e this useEffect will be called when user is changed, and onSnapshot is called when
    the data of curUser change, like number of posts, profile*/
    useEffect(()=>{
        const unsub = database.users.doc(curUser.uid).onSnapshot((doc)=>{
            console.log("home renders");
            setUserData(doc.data())
        })
    },[curUser])

    
    return (
        <>
        {   curUser?
                <div className={style.Main}>
                    <Menu userData={userData} /> 
                    <Home userData={userData}/>
                    <Suggestion/>
                </div>:
                <CircularProgress style={{position:'fixed',top:'0',left:'50vh'}}/>

        }
        </>
        
    )
}

export default Main
