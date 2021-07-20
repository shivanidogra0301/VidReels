import React,{useContext} from 'react'
import {Route,Redirect} from 'react-router-dom'
import { AuthContext } from '../Context/AuthProvider'

//here props contains three thing path,exact,component , so we put everything except component on rest
const PrivateRoute = ({component:Component,...rest}) => {
    const {curUser} = useContext(AuthContext)
    // console.log(curUser)
    return (
        <Route {...rest} render={props=>{
            return curUser?<Component {...props} />:<Redirect to='/login'/>
        }

        } />
    )
}

export default PrivateRoute
