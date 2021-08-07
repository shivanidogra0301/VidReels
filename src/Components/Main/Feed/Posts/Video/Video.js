import React from 'react'
import style from './Video.module.css'
import ReactDOM from 'react-dom';
const Video = (props) => {

    const handleMute = (e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }

    const handleAutoScroll= (e)=>{
        // console.log(ReactDOM.findDOMNode(e.target).parentNode.parentNode);
        let next = ReactDOM.findDOMNode(e.target).parentNode.parentNode.nextSibling;
        console.log(next);
        if(next)
        {
            next.scrollIntoView({behaviour:'smooth',block: "center"});
            e.target.muted = true;
        }
    }
    return (
        <>
            <video className={style.videoelement} loop src={props.source}  
                onClick={handleMute} 
                muted='muted' 
                type='video/mp4'
                 >

            </video>
        </>
    )
}

export default Video
