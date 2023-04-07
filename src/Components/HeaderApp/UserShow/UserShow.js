import React, { useEffect } from 'react'
import './UserShow.scss'
import { AiFillCaretDown } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { RiSettingsFill } from 'react-icons/ri'
import { FaTicketAlt, FaUser } from 'react-icons/fa'
import { MdHelpCenter } from 'react-icons/md'
import TicketItem from './TicketItem/TicketItem'

export default function UserShow() {
    const userInfo = useSelector(state => state.userManage.currentUser)
    const ticketLs = useSelector(state => state.userManage.ticketLs)
    const dispatch = useDispatch()

    const HandleLogOut = () => {
        localStorage.removeItem('userInfo')
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: undefined
        })
        alert(`See you soon, ${userInfo?.Name}!`)
    }
    useEffect(() => {
        if (userInfo) {
            dispatch({
                type: 'GET_API',
                payload: {
                    link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/Bank/CardRef/${userInfo.Email}`,
                    type: 'SET_BANK_ACCOUNT'
                }
            })
            dispatch({
                type: 'GET_API',
                payload: {
                    link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/TicketByEmail/${userInfo.Email}`,
                    type: 'SET_TICKETLS'
                }
            })
        }
    }, [])
    return (
        <div className='userShow'>
            <p>Hi, {userInfo?.Name}!</p>
            <div className='ticketList'>
                <FaTicketAlt />
                <div className='more'>
                    <ul className='moreContain'>
                        {ticketLs.map((e, i) => {
                            return <li key={i}><TicketItem {...e} /></li>
                        })}
                    </ul>
                </div>
            </div>
            <div className='avatar'>
                <AiFillCaretDown />
                <div className='imgAvatar'></div>
                <div className='more'>
                    <ul className='moreContain'>
                        <li>
                            <p className='title'><FaUser className='icon' /><span>Proflie</span></p>
                        </li>
                        <li>
                            <p className='title'><RiSettingsFill className='icon' /><span>Setting</span></p>
                        </li>
                        <li>
                            <p className='title'><MdHelpCenter className='icon' /><span>Feedback and help</span></p>
                        </li>
                        <div className='logOut'>
                            <button onClick={HandleLogOut}>Log out</button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>

    )
}
