import React from 'react'
import style from './Suggestions.module.css'
import src from '../../../Images/barbora-polednova-dY7Q-sl77L4-unsplash.jpg'
const Suggestion = () => {
    return (
        <div className={style.suggestionContainer}>
            <div className={style.SuggestionHeader}>
                <h2>Suggestions For You</h2>
                <h2 className={style.highlight}>See all</h2>
            </div>
            <div className={style.profileContainer}>
                <img className={style.imageContainer+" " + style.items} src = {src}/>
                <h2 className={style.items}>Monica Geller</h2>
                <div  className={ style.followbtn}>Follow</div>
            </div>
            <div className={style.profileContainer}>
                <img className={style.imageContainer+" " + style.items} src = {src}/>
                <h2 className={style.items}>Rachel Greene</h2>
                <div  className={ style.followbtn}>Follow</div>
            </div>
            <div className={style.profileContainer}>
                <img className={style.imageContainer+" " + style.items} src = {src}/>
                <h2 className={style.items}>Phoebe Buffay</h2>
                <div  className={ style.followbtn}>Follow</div>
            </div>
        </div>
    )
}

export default Suggestion
