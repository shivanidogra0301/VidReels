import React,{useState,useEffect} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './Posts.module.css'
import {database} from '../../../../../firebase'
import Video from  './Video/Video'
import Like from './Like/Like'
import AddComment from './Comments/AddComment'
import Comments from './Comments/Comments';
const Posts= (props) => {
    const[posts,setPosts] = useState(null);

    const callback = entries=>{
        entries.forEach(element => {
            // console.log(element);
            let el = element.target.childNodes[0];
            // console.log(el);
            el.play().then(()=>{
                //if this video is not in viewport then pause it
                if(!el.paused && !element.isIntersecting)
                {
                    el.pause();                
                }
            })

        });
    }

    /* create an observer which observe if the element is 85% on the screen means if video is less than 85%
    then we have to pause it*/
    const observer = new IntersectionObserver(callback,{ threshold:0.85 });

/*this useeffect will call when we mounted, we will add event listener to all the posts if
new post is created then we have to store it posts state, to make realtime flow,thats why we added
snapshot on array containing object of all posts*/
    useEffect(()=>{
        let parr=[];
        //sort posts on the basis of time, create snapshot
        const unsub = database.posts.orderBy('createdAt','desc').onSnapshot(querySnapshot=>{
        //we have to empty this array, otherwise whenever this snapshot calls, we will
        //add all posts in parr which result in duplicacy
          parr=[];

          querySnapshot.forEach((doc)=>{
            console.log(doc.data(),+"  "+doc.id);
            let data = {...doc.data(),postId:doc.id}
            parr.push(data)
          })
          setPosts(parr);
  
        })
        return unsub;
      }
      ,[])



    //whenever new post is being created, so this use effect will be called and observer will be added
    useEffect(()=>{
        let elements = document.querySelectorAll('.videos');
        elements.forEach(el=>{
          observer.observe(el);
        })
        return ()=>{
          observer.disconnect();
        }
      },[posts])
    
    return (
        <>
        {
            posts === null ? <></>:
            <div className={style.videosContainer}>
                {
                    posts.map((post) => (
                        <div  className={style.videoModal} key={post.postId}>
                            <div className={style.authorData}>
                                <div className= {style.authorPic}>
                                    <img  src ={post.uProfile}/>
                                </div>
                                <div className= {style.authorName}>
                                    {post.uName}
                                </div>
                            </div>
                            <div className={style.videoData+" videos"}>
                                <Video  source = {post.pUrl} id={post.pId} />
                            </div>
                            <div className={style.postIconContainer}>
                            <Comments userData={props.userData} postData={post} />
                            
                            <Like className={style.postIcons} userData={props.userData} postData={post}/>
                            </div>

                        </div>
                    ))
                }
            </div>
        }
        </>
    )
}

export default Posts
