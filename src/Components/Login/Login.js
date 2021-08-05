import React,{useState,useContext,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider'
import { useHistory } from 'react-router-dom'
import style from './Login.module.css'
import src from '../../videos/video.mp4'
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null)
    const {login,curUser} = useContext(AuthContext);
    const history = useHistory();

    const errorHandling = (code)=>{
        if(code == 'auth/invalid-email'){
            setError("Invalid Email")
        }
        else if(code == 'auth/wrong-password'){
            setError("Wrong Password")
        }
        else{
            setError("User Not Found")
        }
    }
    
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
            errorHandling(err.code)
            console.log(err);
            setTimeout(()=>setError(''),2000);
            setLoading(false);
        }
    }

    //if user is logged in then never show login page
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
                    <div className={style.Logo}>
                        <svg className={style.icon} viewBox="0 0 32 32">
        
                            <path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM16 3.55c1.886 0 3.416 1.53 3.416 3.416s-1.53 3.416-3.416 3.416c-1.886 0-3.416-1.53-3.416-3.416s1.53-3.416 3.416-3.416zM3.612 12.96c0-1.886 1.53-3.416 3.416-3.416s3.416 1.53 3.416 3.416c0 1.886-1.53 3.416-3.416 3.416s-3.416-1.53-3.416-3.416zM10.576 26.416c-1.886 0-3.416-1.53-3.416-3.416s1.53-3.416 3.416-3.416c1.886 0 3.416 1.53 3.416 3.416s-1.53 3.416-3.416 3.416zM16 18c-1.104 0-2-0.896-2-2s0.896-2 2-2c1.104 0 2 0.896 2 2s-0.896 2-2 2zM21.424 26.436c-1.886 0-3.416-1.53-3.416-3.416s1.53-3.416 3.416-3.416c1.886 0 3.416 1.53 3.416 3.416s-1.53 3.416-3.416 3.416zM24.972 16.396c-1.886 0-3.416-1.53-3.416-3.416s1.53-3.416 3.416-3.416c1.886 0 3.416 1.53 3.416 3.416s-1.53 3.416-3.416 3.416z">

                            </path>

                        </svg>

                        <div>Reels</div>   
                    </div>
                    <div className={style.inputContainer}>
                        <input className={style.inputField} type = 'email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input>
                        <label className={labelClassesEmail.join(' ')} htmlFor="style.inputContainer">Email</label>

                    </div>

                    <div className={style.inputContainer}>
                        <input className={style.inputField} type = 'password' value={password} onChange={(e)=>{setPassword(e.target.value)} } required></input>
                        <label className={labelClassesPass.join(' ')} htmlFor=''>Password</label>

                    </div>
                    <div className={style.btnConatiner}>
                        <button className={style.btn} type="submit" onClick={handlesubmit} disabled={loading} >Login</button>
                    </div>

                    <div style={{fontSize:'1.2rem'}}>Don't have an account?<Link to='/signup'> Sign up</Link></div>

                    {
                        error != null?
                        <div style={{color:'red', marginTop : '1rem',fontWeight: 'bold'}}>{error}</div>:<></>
                    }
                    
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
