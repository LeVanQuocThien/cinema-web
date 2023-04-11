
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './LeftWrap.scss'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export default function LeftWrap() {
    const nav = useNavigate()
    const wrapRef = useRef()
    const dispatch = useDispatch()
    const movieShowing = useSelector(state => state.movieManage.movieShowing?.sort((a, b) => b.views - a.views).slice(0, 5))
    const [classList, setClassList] = useState(['item1', 'item2', 'item3', 'item4', 'item5'])

    //=========================== Slide bar =====================================
    const RunSlide = () => {
        return setInterval(() => {
            setClassList(prev => {
                return prev.map((e, i) => prev[i === 0 ? prev.length - 1 : i - 1])
            })
        }, 3000)
    }
    useEffect(() => {
        let id = RunSlide()
        wrapRef.current.addEventListener('mouseover', () => clearInterval(id))
        wrapRef.current.addEventListener('mouseout', () => { id = RunSlide() })

        return () => clearInterval(id)
    }, [])

    return (
        <div className={`leftWrap`}>
            <div className='trendWrap'>

                <div className='listTrend' ref={wrapRef}>
                    {/* ====== Up Slide ======== */}
                    <div className='previous' onClick={() => {
                        setClassList(prev => {
                            return prev.map((e, i) => prev[i === 0 ? prev.length - 1 : i - 1])
                        })
                    }}>
                        <MdOutlineKeyboardArrowUp className='icon' />
                    </div>
                    {/* ========= Down Slide ============= */}
                    <div className='next' onClick={() => {
                        setClassList(prev => {
                            return prev.map((e, i) => prev[prev.length - 1 === i ? 0 : i + 1])
                        })
                    }}>
                        <MdOutlineKeyboardArrowDown className='icon' />
                    </div>
                    {movieShowing.map((e, i) => {
                        return <div key={i} className={`itemSwipe ${classList[i]}`}>
                            <div
                                className='trendItem' style={{ backgroundImage: `url(${e.imagePortrait})` }}
                                onClick={() => { dispatch({ type: 'RESET_MOVIE_DETAIL' }); nav(`/movie/${e.id}`) }}
                            >
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </div>
    )
}
