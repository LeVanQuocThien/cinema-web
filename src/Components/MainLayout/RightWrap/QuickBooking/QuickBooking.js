import React, { useEffect, useState } from 'react'
import './QuickBooking.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function QuickBooking() {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const allMovieLs = useSelector(state => state.movieManage.movieShowing)
    const allCinemaLs = useSelector(state => state.allCinemaManage.cinemaLs)
    const detail = useSelector(state => state.movieDetailManage)
    const ticketLs = useSelector(state => state.ticketManage)
    const user = useSelector(state => state.userManage.currentUser)
    const [movieSelected, setMovieSelected] = useState('')
    const [dates, setDates] = useState([])
    const [dateSelected, setDateSelected] = useState('')
    const [sessions, setSessions] = useState([])
    const [time, setTime] = useState('')
    const [showMess, setShowMess] = useState(false)

    const HandleSelectCinema = (event) => {
        // if (detail.cinemaLs.some(e => e?.code === event.target.value)) {
        //     setDates(detail.cinemaLs.filter(e => e?.code === event.target.value)[0].dates)
        // }
        dispatch({
            type: 'SET_MORE_INFO',
            payload: {
                key: 'cinemaName',
                value: allCinemaLs.filter(e => e.code === event.target.value)[0].name
            }
        })
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/cinemas/${event.target.value}`,
                type: 'SET_SHOWTIME_MOVIELS'
            }
        })
    }
    const HandleSelectMovie = (event) => {
        let temp = allMovieLs.filter(e => e.id === event.target.value).map(e => ({
            filmName: e.name,
            imageLandscape: e.imageLandscape,
            imagePortrait: e.imagePortrait

        }))[0]
        for (let key in temp) {
            dispatch({
                type: "SET_MORE_INFO",
                payload: {
                    key,
                    value: temp[key]
                }
            })
        }
        setMovieSelected(event.target.value)
    }
    const HandleSelectDate = (event) => {
        let sessionLs = dates.filter(e => e.showDate === event.target.value)[0]
            .bundles.map(bundle => bundle.sessions).flat()
        setDateSelected(event.target.value)
        setSessions(sessionLs)
    }
    const HandleNext = () => {
        if (!user) {
            alert('You gotta sign in to use this feature')
            return
        }
        if (time) {
            let newSess = sessions.filter(e => e.id === time).map(e => ({
                theaterName: e.screenName,
                showTime: e.sessionBusinessDate.split('T')[0] + `T${e.showTime}Z`,
                session: e.id,
            }))[0]
            if (newSess.session !== ticketLs.session) {
                dispatch({ type: 'RESET_CHOICE' })
            }
            for (let key in newSess) {
                dispatch({
                    type: "SET_MORE_INFO",
                    payload: {
                        key,
                        value: newSess[key]
                    }
                })
            }
            nav(`/chooseseat/${time}`)
        } else {
            setShowMess(true)
            setTimeout(() => {
                setShowMess(false)
            }, 2000);
        }
    }
    useEffect(() => {
        if (detail.movieLs.some(e => e?.id === movieSelected)) {
            setDates(detail.movieLs.filter(e => e?.id === movieSelected)[0].dates)
        } else {
            setDates([])
        }
    }, [detail, movieSelected])
    useEffect(() => {
        setTime('')
    }, [dates, dateSelected])
    useEffect(() => {
        setDateSelected('')
        setSessions([])
    }, [dates])
    return (
        <div className='quickBooking'>
            <h3>Booking Now!</h3>
            <div className='selectWrapper'>
                <select onChange={HandleSelectCinema}>
                    <option hidden value={''}>-- Cinema --</option>
                    {allCinemaLs?.map((cinema, i) => <option key={i} value={cinema.code}>{cinema.name}</option>)}
                </select>
                <select onChange={HandleSelectMovie}>
                    <option hidden value={''}>-- Movie --</option>
                    {allMovieLs?.map((movie, i) => <option key={i} value={movie.id}>{movie.name}</option>)}
                </select>
                <select value={dateSelected} onChange={HandleSelectDate}>
                    <option hidden value={''}>-- Date --</option>
                    {dates.map((e, i) => <option key={i} value={e.showDate}>{e.showDate}</option>)}
                </select>
                <select value={time} onChange={(event) => { setTime(event.target.value) }}>
                    <option hidden value={''}>-- Show time --</option>
                    {sessions.map((e, i) => <option key={i} value={e.id}>{e.showTime}</option>)}
                </select>
            </div>
            <div className='btnNext'>
                <button onClick={HandleNext} className='action'>Next step</button>
                <span className={showMess ? 'activeMess' : ''}>Please complete the form !</span>
            </div>
        </div>
    )
}
