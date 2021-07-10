import React,{useState,useContext,useEffect} from 'react'
import {AuthContext} from '../../Context/AuthProvider'
import {storage,database} from '../../firebase'
function SignUp() {
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[name,setName] = useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState('');
    const[profilepic,setpic] = useState(null);
    const {signup} = useContext(AuthContext);
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
    }
    catch(err){
        setError(err)
        setTimeout(()=>setError(''),2000);
        setLoading(false)
    }
        
    }
    const handleprofilepic = (e)=>{
        let profilepic = e.target.files[0];
        if(profilepic != null){
            setpic(profilepic)
        }
    }
    return (
        <div>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor=''>UserName</label>
                    <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor=''>Email</label>
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor=''>Profile image</label>
                    <input type='file' accept='image/*' onChange={handleprofilepic}/>
                </div>
                <button type='submit' disabled={loading}>SignUp</button>
            </form>
        </div>
    )
}

export default SignUp
