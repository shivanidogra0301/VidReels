import React from 'react'
import style from './Header.module.css'
import src1 from '../../../../Images/Icons/icons8-home-24.png'
import src2 from '../../../../Images/Icons/icons8-comments-24.png'
import src3 from '../../../../Images/Icons/icons8-male-user-96.png'

const Header = (props) => {
  return (
    <div className = {style.navbar}>
        <div className={style.navElements}>
            <div className= {style.heading}>Instagram</div>
            <div className={style.icons}>
                <div  className= {style.iconsItems}>
                <img className= {style.iconsimg}  src ={src1}/>
                </div>
                <div className={style.iconsItems}>
                    
                <img className= {style.iconsimg}  src ={src2}/>
                </div>
                <div className={style.iconsItems}>
                    {
                        props.userData?.profileUrl==null?  <img className= {style.iconsimg}  src ={src3}/> :
                        <img className= {style.iconsimg} src ={props.userData.profileUrl}/>
                    }
                </div>

            </div>
        </div>
    </div>
  )
}

export default Header
