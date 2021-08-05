import React,{useState,useContext,useEffect} from 'react'
import {AuthContext} from '../../Context/AuthProvider'
import {storage,database} from '../../firebase'
import style from './SignUp.module.css'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'

function SignUp() {

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[name,setName] = useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState('');
    const[profilepic,setpic] = useState(null);
    const {signup,curUser} = useContext(AuthContext);
    const history = useHistory();

   
    const handleSignup = async (e)=>{
        e.preventDefault();
        try{
        setLoading(true);
        let res = await signup(email,password)
        let uid = res.user.uid;
        // console.log(uid);
        //this is go to storage make user , and inside a id then a folder name profileimage which stores url
        const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(profilepic);
        // fn1 -> progress tracking called anytmie
        //fn2 -> error called when error occur
        //fn3 -> called on success completion

        uploadTaskListener.on('state_changed',fn1,fn2,fn3)
        function fn1(snapshot){
            var progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');   
            //used to show the progress that this percent is
        }
        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError("")
            },2000)
            setLoading(false);
        }
        async function fn3(){
            //download the url
            let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
            // console.log(downloadUrl)

            //to store information in firestore database
            await database.users.doc(uid).set({
                email:email,
                userId:uid,
                username:name,
                createdAt:database.getCurrentTimeStamp(),
                profileUrl:downloadUrl,
                postIds:[]
            })
        }
        setLoading(false);
        console.log("User has signed up")
        history.push('/')
    }
    catch(err){
        setError(err)
        setTimeout(()=>setError(''),2000);
        setLoading(false)
    }
        
    }
//if used has signed in, then it should no redirect it to signup page
    useEffect(()=>{
        if(curUser)
        {
          history.push('/')
        }
      },[])
    const handleprofilepic = (e)=>{
        let profilepic = e.target.files[0];
        if(profilepic != null){
            setpic(profilepic)
        }
        console.log(profilepic)
    }

    let labelClassesEmail = [style.inputText];
    if(email.length > 0){
        labelClassesEmail.push(style.focusText);
    }

    let labelClassesPass = [style.inputText];
    if(password.length > 0){
        labelClassesPass.push(style.focusText);
    }
    let labelClassesname = [style.inputText];
    if(name.length > 0){
        labelClassesname.push(style.focusText);
    }

    return (
        <>{
            (curUser)?<CircularProgress/>:
        <div className={style.background}>
            <form onSubmit={handleSignup} className={style.container}>
                <div className={style.formContainer}>
                    <div className={style.inputContainer}>
                        <input className={style.inputField} type='text' value={name} onChange={(e)=>setName(e.target.value)} required/>
                        <label className={labelClassesname.join(' ')} htmlFor=''>UserName</label>

                    </div >
                    <div className={style.inputContainer}>
                        <input className={style.inputField} type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        <label className={labelClassesEmail.join(' ')} htmlFor=''>Email</label>

                    </div>
                    <div className={style.inputContainer}>
                        <input className={style.inputField} type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        <label className={labelClassesPass.join(' ')} htmlFor=''>Password</label>

                    </div>
                    <div className={style.inputContainer}>
                        <div className={style.fileUploadContainer}>
                            <span className={style.fileName}>Profile Image</span>
                            <label className={style.choosebtn} htmlFor="choose">Upload</label>
                            <input className={style.hidden} id= "choose"  type='file' accept='image/*' onChange={handleprofilepic} required/>
                            {(profilepic != null)?<span>{profilepic.name}</span>:<p></p>}
                        </div>
                       
                    </div>
                    <div className={style.inputContainer}>
                    <button className={style.btn}  type='submit' disabled={loading}>SignUp</button>

                    </div>
                </div>

                <div style={{fontSize:'1.2rem'}}>Have an account?<Link to='/login'> Log in</Link></div>
                
            </form>
        </div>
        }
        </>
    )
}

export default SignUp
