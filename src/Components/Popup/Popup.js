import React from 'react'
import './Popup.scss'
import Login from '../Login/Login'
import Register from '../Register/Register'
import { useDispatch, useSelector } from 'react-redux'
import TicketDetail from '../TicketDetail/TicketDetail'
import Trailer from '../Trailer/Trailer'

export default function Popup() {
    const dispatch = useDispatch()
    const popupManage = useSelector(state => state.showPopupManage)


    return (
        popupManage.isShow &&
        <div className='popup'>
            <div className='clearPopup' onClick={() => { dispatch({ type: 'DISAPPEAR' }) }}></div>
            {popupManage.screen === 'signIn' && <Login />}
            {popupManage.screen === 'register' && <Register />}
            {popupManage.screen === 'ticketDetail' && <TicketDetail />}
            {popupManage.screen === 'trailer' && <Trailer />}

        </div>
    )
}
