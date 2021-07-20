import React,{useState,useContext,useEffect} from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { useHistory } from 'react-router-dom'
import style from './Login.module.css'
import src from '../../videos/video.mp4'
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('')
    const {login,curUser} = useContext(AuthContext);
    const history = useHistory();
    const handlesubmit = async(e) =>{
        //form by default reload page
        e.preventDefault();

        try{
            setLoading(true);
            //user get logged in
            await login(email,password)
            
            setLoading(false)
            //when user get logged in riderect it to home page
            history.push('/')
            // console.log(uid);
        }
        catch(err){
            setError(err)
            console.log(error);
            setTimeout(()=>setError(''),2000);
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(curUser){
            history.push('/')
        }
    },[])

    let labelClassesEmail = [style.inputText];
    if(email.length > 0){
        labelClassesEmail.push(style.focusText);
    }

    let labelClassesPass = [style.inputText];
    if(password.length > 0){
        labelClassesPass.push(style.focusText);
    }



    

    
    return (
        <>
        { curUser ?<h1>Loading</h1>:
        <div className={style.background}>
            <div className={style.container}>
                
                <form onSubmit={handlesubmit} className={style.formContainer}>
                    <div className={style.inputContainer}>
                        <input className={style.inputField} type = 'email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                        <label className={labelClassesEmail.join(' ')} htmlFor="style.inputContainer">Email</label>

                    </div>

                    <div className={style.inputContainer}>
                        <input className={style.inputField} type = 'password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                        <label className={labelClassesPass.join(' ')} htmlFor=''>Password</label>

                    </div>
                    <div className={style.btnConatiner}>
                        <button className={style.btn} type="submit" onClick={handlesubmit} disabled={loading}>Login</button>
                    </div>
                    
                </form>
                <div className={style.videoContainer}>
                    <video autoPlay muted loop>
                        <source src = {src}/>
                    </video>
                </div>
                
                
            </div>
            
        </div>

         } 
        </>
        
    )
}

export default Login;
