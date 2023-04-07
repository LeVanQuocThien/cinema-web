import React from 'react'
import './Menu.scss'

export default function Menu(props) {

    return (
        <div className='menuComponent'>
            <div className='element'>
                {props.children}
            </div>
            {/* <div className='menuPopup'>
                {props.data.map((e, i) => {
                    return <p>{e.name}</p>
                })}
            </div> */}
        </div>
    )
}
