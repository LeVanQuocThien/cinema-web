import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SlCheck } from 'react-icons/sl'
import './SuccessPopup.scss'

export default function SuccessPopup() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userManage.currentUser)

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'DISAPPEAR' })
        }, 1700)
    }, [])
    return (
        <div className='successPopup'>
            <SlCheck className='icon' />
            <h1>Wellcome, {currentUser.Name} !</h1>
        </div>
    )
}
