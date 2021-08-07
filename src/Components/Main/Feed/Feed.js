import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile/UploadFile';
import './Feed.css'
import Posts from './Posts/Posts'
function Feed(props) {
    
    return (
        <div className='feed-container'>
        
        
                <UploadFile userData={props.userData}/>
                { 
                    props.userData==null ? 
                        <CircularProgress style={{position:'absolute',top:'50%',left:'45%'}} />
                        :
                        <Posts userData={props.userData}/>
                }
        </div>
    )
}

export default Feed