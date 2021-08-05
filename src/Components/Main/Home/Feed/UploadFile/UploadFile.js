import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import {v4 as uuidv4} from 'uuid';
import {storage,database} from '../../../../../firebase'
import style from './UploadFile.module.css'
import { Translate } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor:'#f5ecfe',
        borderRadius : '20px',
        height : '1.2px',
        marginTop : '0.3rem'
        
      }
  }));

  //upload video to the firebase
function UploadFile(props) {
    const classes = useStyles();
    const[loading,setLoading] = useState(false);
    const[error,setError] = useState(null);
    const types =['video/mp4','video/webm','video/ogg'];
    
    const onChange=(e)=>{
        let file = e?.target?.files[0];
        //file is not present
        if(!file){
            setError('Please select a file');
            setTimeout(()=>{setError(null)},2000)
            return;
        }
        //post is not a video type
        if(types.indexOf(file.type)==-1)
        {
            setError('Please select a video file');
            setTimeout(()=>{setError(null)},2000)
            return;
        }

        //post video is large
        if(file.size/(1024*1024)>100)
        {
            setError('The selected file is too big');
            setTimeout(()=>{setError(null)},2000)
            return;
        }
        //returns unique id to uniquely distinguish a post
        const id = uuidv4();
        //upload the video to the firestore like this  posts-userid-postname-file
        const uploadTask = storage.ref(`/posts/${props.userData.userId}/${file.name}`).put(file);

        uploadTask.on('state_changed',fn1,fn2,fn3);
        //file is uploading
        function fn1(snapshot){
            setLoading(true);

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');         
        }
        //check for errors
        function fn2(error){
            setError(error);
            setTimeout(()=>{
                setError(null)
            },2000);
            setLoading(false)
        }
        //when the video is successfully uploaded to firestore
        async function fn3(){
            //create collection of posts means object
            //url contains the url to the post that uploaded to firestore
            uploadTask.snapshot.ref.getDownloadURL().then(url=>{
                //posts object user details is given by current user who logged in
                let obj  ={
                    comments:[],
                    likes:[],
                    pId:id,
                    pUrl:url,
                    uName:props?.userData?.username,
                    uProfile:props?.userData?.profileUrl,
                    userId:props?.userData?.userId,
                    createdAt:database.getCurrentTimeStamp()
                }
                console.log(obj);
                console.log(props.userData);
                //now add this object to database named posts
                database.posts.add(obj).then(async docRef=>{
            //docref is the unique key given by firestore to uniquely identify the post object obj just created
                    console.log(docRef);
        /*now post obj is added, now we will take post id and push it in the user.postid array so when we want
        to display users profile page we can have all the posts data*/
                    let res = await database.users.doc(props.userData.userId).update({
                        postIds:[...props.userData.postIds,docRef.id]
                    })
                }).then(()=>{
                    setLoading(false)
                }).catch(e=>{
                    setError(e);
                    setTimeout(()=>{
                        setError(null)
                    },2000);
                    setLoading(false)
                })
            })
          }




    }

    return (
        <>
        {
            error!=null? <Alert severity="error">{error}</Alert>:<div className={style.postsTop}>
            <h3 className={style.text}>Feed</h3>
            <input type='file' onChange={onChange}  id='icon-button-file' style={{display:'none'}}/>
            <label htmlFor='icon-button-file'>
                <div className={style.btn}  disabled={loading}>
                Upload
                {   loading?
                    <LinearProgress className={classes.root}   />
                    :
                    <></>
                }


                </div>

            </label>
            </div>

        }
        </>
    )
}

export default UploadFile