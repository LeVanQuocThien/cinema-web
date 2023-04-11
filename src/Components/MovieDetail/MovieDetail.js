import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formatText } from '../../CommonFunction/common'
import MainLayout from '../MainLayout/MainLayout'
import { FaChevronDown } from 'react-icons/fa'
import { BsFillPlayFill } from 'react-icons/bs'
import './MovieDetail.scss'
import CinemaBox from './CinemaBox/CinemaBox'
import { Loading } from '../CommonComponents/Image/Image'

export default function MovieDetail() {
    let { movieID } = useParams()
    const movieDataDetail = useSelector(state => state.movieDetailManage.detail)
    const movieDataCityLs = useSelector(state => state.allCinemaManage.cityLs)
    const movieDataCinemaLs = useSelector(state => state.movieDetailManage.cinemaLs)
    const dispatch = useDispatch()
    const [cinemaLs, setCinemaLs] = useState([])
    const [sessions, setSessions] = useState([])
    const [sess, setSess] = useState('')

    const AddInfoTicket = (data) => {
        dispatch({
            type: 'SET_MORE_INFO',
            payload: data
        })
    }
    const HandleChangeCity = (event) => {
        let newLs = movieDataCinemaLs.filter(e => e.cityId.includes(event.target.value))
        setCinemaLs(newLs)
    }
    useEffect(() => {
        AddInfoTicket({ key: 'filmName', value: movieDataDetail.name })
        AddInfoTicket({ key: 'imageLandscape', value: movieDataDetail.imageLandscape })
        AddInfoTicket({ key: 'imagePortrait', value: movieDataDetail.imagePortrait })
    }, [movieDataDetail, dispatch])
    useEffect(() => {
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/movie/${movieID}`,
                type: 'SET_MOVIE_CINEMALS'
            }
        })
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/cinema/movieById/${movieID}`,
                type: 'SET_MOVIE_DETAIL'
            }
        })
    }, [movieID, dispatch])

    useEffect(() => {
        let newSessionLs = []
        movieDataCinemaLs.forEach(e => {
            e.dates.forEach(date => {
                newSessionLs.push(date.showDate)
            })
        })
        let temp = [...new Set(newSessionLs)]
        setCinemaLs(movieDataCinemaLs)
        setSessions(temp)
        setSess(temp[0])
    }, [movieDataCinemaLs])
    return (
        <MainLayout>
            {movieDataDetail.id ?
                <div className='movieDetail'>
                    <section className='overview'>
                        <div className='movieInfo'>
                            <div className='movieBanner'>
                                <div className='banner' style={{ backgroundImage: `url(${movieDataDetail.imagePortrait})` }}></div>
                                <div className='btnTrailer' onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'trailer' })}>
                                    <BsFillPlayFill />
                                </div>
                            </div>
                            <div className='info'>
                                <h1 className='name'>{movieDataDetail.name}</h1>
                                <h1 className='subName'>{movieDataDetail.subName}</h1>
                                <p>Rating: {movieDataDetail.point?.toFixed(2)} <span className='imdb'>IMDb</span></p>
                                <p>Duration: {movieDataDetail.duration} MINS &nbsp;
                                    {movieDataDetail.age !== '0' && <span className='age'>{movieDataDetail.age}<span className='plus'>+</span></span>}
                                </p>
                                <p>Directors: Updating</p>
                                <p>Categories: Updating</p>
                            </div>
                        </div>
                        <p className='movieDescription' dangerouslySetInnerHTML={{ __html: formatText(movieDataDetail.description) }}></p>
                        <div className='intruction'>
                            <p>Showtimes</p>
                            <FaChevronDown className='moveAni' />
                        </div>
                    </section>
                    <section className='movieShowTime'>
                        <div className='selectWrap'>
                            <div className='selectBox'>
                                <select onChange={HandleChangeCity}>
                                    <option value={''}>All of city</option>
                                    {movieDataCityLs.map((city, i) => {
                                        return <option key={i} value={city.id}>{city.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className='selectBox'>
                                <select onChange={(e) => { setSess(e.target.value) }}>
                                    {sessions.map((session, i) => {
                                        return <option key={i} value={session}>{session}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='cinemaWrap'>
                            {cinemaLs.map((cinema, i) => {
                                return <CinemaBox key={i} {...cinema} sess={sess} />
                            })}
                        </div>
                    </section>
                </div>
                :
                <div className='loadingMovie'>
                    <Loading size={120} />
                </div>
            }
        </MainLayout>
    )
}
