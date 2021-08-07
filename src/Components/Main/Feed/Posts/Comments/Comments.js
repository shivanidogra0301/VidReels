import React,{useState,useEffect} from 'react'
import { database } from '../../../../../firebase'
import style from './Comments.module.css'
import { CircularProgress } from '@material-ui/core';
import AddComment from './AddComment';
const Comments = ({userData=null,postData=null}) => {
    const [viewComments,setOpenModal] = useState(false)
    const [comments,setComments] = useState(null)
//whenever post data changed, we loop through all the comments and save it
    useEffect( async ()=>{
        let arr = [];
/*postdata contains comments id, we find that id in comment database, and retreive the data related to comment
i.e username, profile,text*/
        for(let i = 0; i < postData?.comments?.length; i++){
            let cid = postData?.comments[i];
            let data = await database.comments.doc(cid).get();
            arr.push(data.data());
        }
        arr.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        setComments(arr);

    },[postData])
    const handleClick = ()=>{
        if(viewComments == false){
            setOpenModal(true);
        }
    }
    const closeModal= ()=>{
        setOpenModal(false)
    }
    return (
        <div className={style.AllComments} onClick={handleClick}>
            <svg className={style.commentIcon+ " icon icon-bubble"} viewBox="0 0 32 32">
                            <path d="M16 2c8.837 0 16 5.82 16 13s-7.163 13-16 13c-0.849 0-1.682-0.054-2.495-0.158-3.437 3.437-7.539 4.053-11.505 4.144v-0.841c2.142-1.049 4-2.961 4-5.145 0-0.305-0.024-0.604-0.068-0.897-3.619-2.383-5.932-6.024-5.932-10.103 0-7.18 7.163-13 16-13z">

                            </path>

            </svg>
           { viewComments == true?
            <>
                <div className={style.ModalBackground} >
                        <div onClick = {closeModal} className={style.tempModal}></div>
                        <div className={style.Modal}>
                                <div className={style.VideoContainer}>
                                    <video  src = {postData.pUrl} loop autoPlay muted />
                                </div>
                                <div className={style.commentSection}>
                                        <div className={style.authorDataContainer}>
                                            <div className= {style.authorPic}>
                                                <img src = {postData.uProfile}/>
                                            </div>
                                            <div className={style.authorName}>
                                                {postData.uName}
                                            </div>

                                        </div>

                                        <div className={style.commentsContainer}>
                                              {  
                                                comments === null ? <CircularProgress/>:
                                                
                                                comments.map((comment) =>(
                                                    <div className={style.comment}>
                                                        <div className={style.commentUserPic}>
                                                            <img src = {comment.uUrl}/>
                                                        </div>
                                                        <div className={style.textContainer}>
                                                            <div className={style.CommentAuthoreName}>{comment.uName}</div>
                                                            <div className={style.CommentText}>{comment.text}</div>

                                                        </div>
                                                    </div>
                                                ))
                                                

                                            }
                                            
                                        </div>
                                        <AddComment postData={postData} userData={userData}/>
                                </div>
                        </div>
                </div>
            </>
            :
            <>
            </>
            }
        </div>
    )
}

export default Comments
