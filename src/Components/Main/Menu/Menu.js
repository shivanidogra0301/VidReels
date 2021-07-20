import React,{useEffect,useState} from 'react'
import style from './Menu.module.css'
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import { database,storage } from '../../../firebase';
import {  ref, deleteObject } from "firebase/storage";
const useStyles = makeStyles((theme) => ({
        icons : {
            fontSize: '1.5rem',
            transform: 'translateY(2px)',
            marginRight: '1rem'
        }
        
}));
const Menu = ({userData}) => {
    const[profilepic,setprofile] = useState(null)
    const[loading,setloading] = useState(false)
    const classes = useStyles();
    const handleprofilepic = (e)=>{
        let pic = e.target.files[0];
        setprofile(pic);
        var storageRef = storage.ref();
        const uploadTaskListener = storage.ref(`/users/${userData.userId}/profileImage`).put(profilepic);

        // const desertRef = storageRef.child(userData.profileUrl);
        // console.log(desertRef)

        uploadTaskListener.on('state_changed',fn1,fn2,fn3)
        function fn1(snapshot){
            var progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');   
            //used to show the progress that this percent is
        }
        function fn2(error){
            console.log(error)
        }
        async function fn3(){
            //download the url
            setloading(true);

            let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
            

            //to store information in firestore database
            database.users.doc(userData.userId).update({
                profileUrl:downloadUrl
            })
            setloading(false);
        }

        

        

        
        
    }
    
    
    return (
        <div className={style.MenuContainer}>
            <div className={style.Logo}>
                <svg className={style.icon} viewBox="0 0 32 32">
        
                    <path d="M16 0c-8.836 0-16 7.164-16 16s7.164 16 16 16 16-7.164 16-16-7.164-16-16-16zM16 3.55c1.886 0 3.416 1.53 3.416 3.416s-1.53 3.416-3.416 3.416c-1.886 0-3.416-1.53-3.416-3.416s1.53-3.416 3.416-3.416zM3.612 12.96c0-1.886 1.53-3.416 3.416-3.416s3.416 1.53 3.416 3.416c0 1.886-1.53 3.416-3.416 3.416s-3.416-1.53-3.416-3.416zM10.576 26.416c-1.886 0-3.416-1.53-3.416-3.416s1.53-3.416 3.416-3.416c1.886 0 3.416 1.53 3.416 3.416s-1.53 3.416-3.416 3.416zM16 18c-1.104 0-2-0.896-2-2s0.896-2 2-2c1.104 0 2 0.896 2 2s-0.896 2-2 2zM21.424 26.436c-1.886 0-3.416-1.53-3.416-3.416s1.53-3.416 3.416-3.416c1.886 0 3.416 1.53 3.416 3.416s-1.53 3.416-3.416 3.416zM24.972 16.396c-1.886 0-3.416-1.53-3.416-3.416s1.53-3.416 3.416-3.416c1.886 0 3.416 1.53 3.416 3.416s-1.53 3.416-3.416 3.416z">

                    </path>

                </svg>

                <div>Reels</div>   
            </div>
            <div className={style.MenuItemsContainer}>
                <div className={style.MenuHeading}>
                    Menu
                </div>
                <div className={style.menuItems + " "+ style.selected }> 
                    <HomeIcon className={classes.icons }/>
                Home</div>
                <div className={style.menuItems}>
                    <AccountCircleIcon className={classes.icons}/>
                    Profile</div>
                <div className={style.menuItems}>
                    <MessageIcon className={classes.icons}/>
                    Messages</div>

            </div>
            <div className={style.ProfileContainer}>
                { 
                    loading == true?<h1>Loading</h1>:
                    <div className={style.ProfilePic}>
                        <img src = {userData?.profileUrl}/>
                    </div>

                }
                
                <label className={style.choosebtn} htmlFor="choose">
                    <div className={style.Editbutton}>
                        Edit Profile
                    </div>
                </label>
                <input className={style.hidden} id= "choose"  type='file' accept='image/*' onChange={handleprofilepic}/>
                
            </div>


        </div>
    )
}

export default Menu
