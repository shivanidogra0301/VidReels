import React,{useState,useContext,useEffect} from 'react'
import {auth} from '../firebase'
export const AuthContext = React.createContext();

/*<component></component> component written between wrapper components is given in 
props.children
*/
const AuthProvider = ({children}) => {
    const[curUser,setCurrentUser] = useState();
    const[loading,setLoading] = useState(true);

    // all three functions are returning promise
    function signup(email,password)
    {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    function logout(){
        return auth.signOut();
    }

/*this useeffect will add or remove listener on mounting and unmounting .This listener works on auth object, 
any changes happen in auth object will invoke this listener user include the info of user 
if present give user otherwise null. On closing tab only listerner will be removed, not cur user
info present in firebase
*/
    useEffect(()=>{

        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])
//curUser is central user who is using the app currently, it contains object which includes email,uid
    const value = {
        curUser,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading&&children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
