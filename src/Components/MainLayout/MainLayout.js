import React, { useEffect } from 'react'
import LeftWrap from './LeftWrap/LeftWrap'
import RightWrap from './RightWrap/RightWrap'
import './MainLayout.scss'


import HeaderApp from '../HeaderApp/HeaderApp'
import { useDispatch } from 'react-redux'

export default function MainLayout(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        let userInfo = localStorage.getItem('userInfo')
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: userInfo ? JSON.parse(userInfo) : undefined
        })
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/nowAndSoon`,
                type: 'SET_MOVIE_LIST'
            }
        })
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/city`,
                type: 'SET_CITYLS'
            }
        })
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/cinemas`,
                type: 'SET_ALL_CINEMALS'
            }
        })
    }, [dispatch])

    return (
        <div className='mainLayout'>
            <HeaderApp />
            <div className='container'>
                <LeftWrap />
                <div className='content'>
                    {props.children}
                </div>
                <RightWrap />
            </div>
        </div>
    )
}
