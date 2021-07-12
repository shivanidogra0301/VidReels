import React,{useState,useEffect,useContext} from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import style from './Login.module.css'
import src from '../../images/final_60eaeca1503123005bf163b5_958191.mp4'
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('')
    const {login} = useContext(AuthContext);
    const handlesubmit = async(e) =>{
        e.preventDefault();

        try{
            setLoading(true);

            let res = await login(email,password)
            let uid = res.user.uid;
            console.log(uid);
            setLoading(false)
        }
        catch(err){
            setError(err)
            console.log(err);
            setTimeout(()=>setError(''),2000);
            setLoading(false);
        }
    }
    return (
        <div className={style.background}>
            <div className={style.container}>
                <div className={style.imageContainer}>
                    <video autoPlay muted loop>
                        <source src = {src}/>
                    </video>
                </div>
                <form onSubmit={handlesubmit} className={style.formContainer}>
                    <div className={style.inputContainer}>
                        <input className={style.inputField} type = 'email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                        <label className={style.inputText} for="style.inputContainer">Email</label>

                    </div>

                    <div className={style.inputContainer}>
                        <input className={style.inputField} type = 'password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                        <label className={style.inputText} htmlFor=''>Password</label>

                    </div>
                    <div className={style.btnConatiner}>
                        <button className={style.btn} type="submit" onClick={handlesubmit} disabled={loading}>Login</button>
                    </div>
                    
                </form>
                
                
            </div>
            
        </div>
        
    )
}

export default Login;
