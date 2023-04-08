import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../MainLayout/MainLayout'
import MovieTheater from './MovieTheater/MovieTheater'
import './Theater.scss'

export default function Theater() {
    const dispatch = useDispatch()
    const cinemaLs = useSelector(state => state.allCinemaManage.cinemaLs)
    const cityLs = useSelector(state => state.allCinemaManage.cityLs)
    const movieLs = useSelector(state => state.movieDetailManage.movieLs)
    const [cinema, setCinema] = useState([])
    const [dateShow, setDateShow] = useState([])
    const [dateValue, setDateValue] = useState('')

    const AddTicketInfo = (key, value) => {
        dispatch({
            type: 'SET_MORE_INFO',
            payload: {
                key,
                value
            }

        })
    }
    const HandleChangeCity = (event) => {
        setCinema(cinemaLs.filter(e => e.cityId.includes(event.target.value)))
    }
    const HandleChangeCinema = (event) => {
        AddTicketInfo('cinemaName', cinema.filter(e => e.code === event.target.value)[0].name)
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/cinemas/${event.target.value}`,
                type: 'SET_SHOWTIME_MOVIELS'
            }
        })
    }

    useEffect(() => {
        setCinema(cinemaLs.filter(e => e.cityId.includes(cityLs[0].id)))
    }, [cityLs, cinemaLs])
    useEffect(() => {
        let newSessionLs = []
        movieLs.forEach(e => {
            e.dates?.forEach(date => {
                newSessionLs.push(date.showDate)
            })
        })
        let temp = [...new Set(newSessionLs)]
        setDateShow(temp)
        setDateValue(temp[0])
    }, [movieLs])
    useEffect(() => {
        if (cinema[0]) {
            AddTicketInfo('cinemaName', cinema[0].name)
            dispatch({
                type: 'GET_API',
                payload: {
                    link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/cinemas/${cinema[0].code}`,
                    type: 'SET_SHOWTIME_MOVIELS'
                }
            })
        } else {
            dispatch({ type: 'SET_SHOWTIME_MOVIELS', payload: [] })
        }
    }, [cinema, dispatch])

    return (
        <MainLayout>
            <div className='theater'>
                <div className='nameAndTime'>
                    <div className='selectTime'>
                        <select onChange={HandleChangeCity}>
                            {cityLs.map((city, i) => {
                                return <option key={i} value={city.id}>{city.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='selectTime'>
                        <select onChange={HandleChangeCinema}>
                            {cinema.map((e, i) => {
                                return <option key={i} value={e.code}>{e.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='selectTime'>
                        <select onChange={(e) => { setDateValue(e.target.value) }}>
                            {dateShow.map((e, i) => {
                                return <option key={i} value={e}>{e}</option>
                            })}
                        </select>
                    </div>
                </div>
                {!!movieLs.length && <div className='movieList'>
                    {movieLs.map((e, i) => <MovieTheater key={i} {...e} sess={dateValue} />)}
                </div>}
            </div>
        </MainLayout>
    )
}
