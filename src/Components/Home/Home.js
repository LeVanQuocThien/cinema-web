import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillPlayFill } from 'react-icons/bs'

import clsx from 'clsx'
import { formatText } from '../../CommonFunction/common'
import MainLayout from '../MainLayout/MainLayout'
import './Home.scss'
import MovieItem from './MovieItem/MovieItem'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const movieList = useSelector(state => state.movieManage)
    const banner = useSelector(state => state.movieDetailManage.detail)
    const [showList, setShowList] = useState([])
    const [isShow, setIsShow] = useState(true)
    const [isActive, setIsActive] = useState('')

    const HandleChangeShowLs = (movie) => {
        setIsShow(!isShow)
        setShowList(movie)
    }
    const HandleSelectItem = (e) => {
        dispatch({ type: 'SET_MOVIE_DETAIL', payload: e })
        setIsActive(e.id)
    }
    const HandleClickBuy = () => {
        dispatch({ type: 'RESET_MOVIE_DETAIL' })
        nav('/movie/' + banner.id)
    }
    useEffect(() => {
        setShowList(movieList.movieShowing)
        setIsActive(movieList.movieShowing[0]?.id)

    }, [movieList])
    useEffect(() => {
        dispatch({ type: 'SET_MOVIE_DETAIL', payload: showList[0] })
    }, [showList, dispatch])

    return (
        <MainLayout>
            {!!movieList.movieShowing.length && <div className='home'>
                {/* ====== Change category ===== */}
                <div className='category'>
                    <button
                        onClick={() => { HandleChangeShowLs(movieList.movieShowing) }}
                        className={clsx({ 'active': isShow })}
                    >
                        Movie showing
                    </button>
                    <button
                        onClick={() => { HandleChangeShowLs(movieList.movieCommingSoon) }}
                        className={clsx({ 'active': !isShow })}
                    >
                        Coming soon
                    </button>
                </div>
                {/* ======== Show banner selected ======== */}
                <div className='movieSelected'>
                    <div
                        style={banner?.imageLandscape ? { backgroundImage: `url(${banner.imageLandscape})` } : {}}
                        className='banner'
                    >
                    </div>
                    <div className='shortInfoWrap'>
                        <div className='shortInfo'>
                            <h1>{banner?.name}</h1>
                            <p dangerouslySetInnerHTML={{ __html: formatText(banner?.description) }}></p>
                            <div className='actionWrap'>

                                <button className='trailer'
                                    onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'trailer' })}
                                >
                                    <BsFillPlayFill />
                                </button>
                                <button className='bookTicket' onClick={HandleClickBuy}>
                                    Buy ticket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ========= All movie slide ========== */}
                <div className='listMovie'>
                    {showList.map((e, i) => {
                        return <MovieItem
                            key={i}
                            img={e.imagePortrait}
                            onClick={() => { HandleSelectItem(e) }}
                            active={isActive === e.id}
                        />
                    })}
                </div>
            </div>}
        </MainLayout>
    )
}
