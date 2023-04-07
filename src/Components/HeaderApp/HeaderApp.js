import React from 'react'
import './HeaderApp.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import UserShow from './UserShow/UserShow'
import { useDispatch, useSelector } from 'react-redux'
import { Logo } from '../CommonComponents/Image/Image'

export default function HeaderApp() {
    const currentUser = useSelector(state => state.userManage.currentUser)
    const dispatch = useDispatch()
    const nav = useNavigate()
    return (
        <div className='headerApp'>
            <div className='logoImg'>
                <Logo width={'114x'} />
            </div>
            <div className='navbar'>
                <div className='menuWrapper'>
                    <div className='menu' onClick={() => { nav('/') }}>Movie</div>
                    <div className='menu' onClick={() => { nav('/theater') }}>theater</div>
                    <div className='menu'>Event</div>
                    <div className='menu'>Support</div>
                </div>
                <div className='search'>
                    <input placeholder='Search...' />
                    <FontAwesomeIcon icon={faSearch} className='icon' />
                </div>
            </div>
            {!currentUser ? <div className='btnWrap'>
                <button onClick={() => { dispatch({ type: 'SET_SCREEN', payload: "signIn" }) }} className='btn btnSignin'>Sign in</button>
                <button onClick={() => { dispatch({ type: 'SET_SCREEN', payload: "register" }) }} className='btn btnRegister'>Register</button>
            </div> :
                <UserShow />
            }
        </div>
    )
}
