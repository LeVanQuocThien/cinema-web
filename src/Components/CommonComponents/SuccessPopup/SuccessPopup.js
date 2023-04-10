import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { SlCheck } from 'react-icons/sl'
import './SuccessPopup.scss'

export default function SuccessPopup() {
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'DISAPPEAR' })
        }, 2000)
    }, [])
    return (
        <div className='successPopup'>
            <SlCheck className='icon' />
            <h1>Wellcome, Thien !</h1>
        </div>
    )
}
