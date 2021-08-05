import React,{useState} from 'react'
import {database} from '../../../../../../firebase'
import style from './Comments.module.css'
const AddComment = ({userData=null , postData=null}) => {
    const [comment,setComment] = useState('');
    const HandlecommentChange = (e) =>{
        let value = e.target.value;
        setComment(value);
    }
//when current user post a comment, we make a object in comments which includes user profile pic,
//comment and user name, these three things is showed in screen
    const handleCommentSubmit= ()=>{
        let obj = {
            text : comment,
            uName : userData.username,
            uUrl  : userData.profileUrl,
            createdAt:database.getCurrentTimeStamp()
        }

//add this object to comment database, firebase will return a unique id for that comment , we will add that id
//to comments array of post. So whenever we need to show comments on screen we will print that array
        database.comments.add(obj).then(docref =>{
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments,docref.id]
            })
        })
        .catch(e =>{
            console.log(e);
        })
        setComment('');

    }
    return (
        <div className={style.commentInputContainer}>
            <textarea value={comment} className={style.commentInput} onChange={HandlecommentChange}>

            </textarea>
            <button onClick={handleCommentSubmit} className={style.commentBtn} disabled={comment === ''? true:false}>Post</button>

        </div>
    )
}

export default AddComment
