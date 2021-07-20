import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';
import UploadFile from './UploadFile/UploadFile';
import './Feed.css'
import Posts from './Posts/Posts'
function Feed(props) {
    
    return (
        <>
        { props.userData==null ? <CircularProgress />:<>
        
       
        <div className='feed-container'>
                <UploadFile userData={props.userData}/>
                <Posts userData={props.userData}/>

        </div>

        </>
        }
        </>
    )
}

export default Feed