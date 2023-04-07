import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Privite({ children }) {
    const nav = useNavigate()
    const currentUser = useSelector(state => state.userManage.currentUser)
    useEffect(() => {
        if (!currentUser) {
            nav('/')
        }
    }, [currentUser, nav])
    return (
        <div>
            {currentUser && children}
        </div>
    )
}
