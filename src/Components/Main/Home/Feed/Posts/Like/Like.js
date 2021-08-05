import React,{useState,useEffect} from 'react'
import {database} from '../../../../../../firebase'
import FavoriteIcon from '@material-ui/icons/Favorite';
import {makeStyles} from '@material-ui/core/styles';
import style from './Like.module.css'
const useStyles = makeStyles({

    like:{
        color:'#e74c3c',
        cursor:'pointer'
    },
    unlike:{
        color:'lightblue',
        cursor:'pointer'
    }
    ,
    iconStyling:{
        fontSize: '2.5rem',
        width: '3rem'

    }
})

//provide default value to userData and postData
const Like = ({userData=null,postData=null}) => {
    const [like,setLike] = useState(null)
    const [totalLikes,setTotalLikes] = useState(0)
    const classes = useStyles();

    useEffect(() => {
        let check = postData.likes.includes(userData?.userId)?true:false;
        setLike(check);
        let tLikes = postData?.likes?.length;
        setTotalLikes(tLikes);
        
    }, [postData])

/* if current state of like is true, then we have to unlike it, for this we will go to
postdata and remove current user id from its like array now the data is changes in postdata
so again snapshot is taken from posts.js and send here, postData is changed so useEffect will be called
and current state is changed*/
    const handleLike=async()=>{
        if(like==true)
        {
            //unlike
            let uarr = postData?.likes?.filter(el=>{
                return el!=userData.userId
            })
            await database.posts.doc(postData.postId).update({
                likes:uarr
            })
        }
        else{
            //like
            let uarr = [...postData.likes,userData.userId];
            await database.posts.doc(postData.postId).update({
                likes:uarr
            })
        }
    }
    return (
        <div className={style.LikeContainer}>
           {
               like !== null ? <>
               {
                   like === true? 
                   <>
                    <FavoriteIcon className={`${classes.like} ${classes.iconStyling}`} onClick={handleLike}></FavoriteIcon>
                   </>
                    : 
                   <FavoriteIcon className={`${classes.unlike} ${classes.iconStyling}`} onClick={handleLike}></FavoriteIcon>
               }
               </>
               :
               <></>
           } 
        </div>
    )
}

export default Like
