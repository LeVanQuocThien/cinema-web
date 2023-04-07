import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './LsShowTime.scss'

export default function LsShowTime({ sessItem, jsonDispatch }) {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const ticketSesstion = useSelector(state => state.ticketManage.session)
    const currentUser = useSelector(state => state.userManage.currentUser)
    const HandleChooseTime = (session) => {
        if (currentUser) {
            let newShowDate = session.sessionBusinessDate.replace('00:00:00', `${session.showTime}Z`)
            let newArrDispatch = [
                ...jsonDispatch,
                {
                    key: 'showTime',
                    value: newShowDate
                },
                {
                    key: 'theaterName',
                    value: session.screenName
                },
                {
                    key: 'session',
                    value: session.id
                }
            ]
            if (ticketSesstion !== session.id) {
                newArrDispatch.forEach(e => {
                    dispatch({
                        type: 'SET_MORE_INFO',
                        payload: e
                    })
                })
                dispatch({
                    type: 'RESET_CHOICE'
                })
            }
            nav(`/chooseseat/${session.id}`)
        } else { alert('dang nhap de') }
    }
    return (
        <div className='lsShowTime'>
            {sessItem?.bundles.map((e, i) => {
                return <div key={i} className='itemList'>
                    <h3>{`${e.version}  ${e.caption}`}: </h3>
                    <div className='timeList'>
                        {e.sessions.map((session, i) => {
                            return <div onClick={() => { HandleChooseTime(session) }} key={i} className='time'>
                                <span>{session.showTime}</span>
                            </div>
                        })}
                    </div>
                </div>
            })}
        </div>
    )
}
