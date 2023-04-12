import React, { useEffect, useState } from 'react'
import './Trailer.scss'
import { useSelector } from 'react-redux'

export default function Trailer() {
    const detail = useSelector(state => state.movieDetailManage.detail)
    const [idLink, setIdLink] = useState('')
    useEffect(() => {
        setIdLink(detail.trailer.match(/=.+$/g)[0].substring(1))
    }, [])
    return (
        <div className='trailerBox'>
            <iframe
                className='video'
                src={`https://www.youtube.com/embed/${idLink}?playlist=${idLink}&loop=1&rel=0&autoplay=1`}
                allow='autoplay'
                title="YouTube video player"
                allowFullScreen></iframe>
        </div>
    )
}
