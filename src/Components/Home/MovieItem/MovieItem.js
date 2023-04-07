import React from 'react'
import './MovieItem.scss'
import clsx from 'clsx'

export default function MovieItem({ img, onClick, active }) {
    return (
        <div className='movieItem'>
            <div
                onClick={onClick}
                className={clsx('item', {
                    active: active
                })}
                style={{ backgroundImage: `url(${img})` }}
            >
            </div>
        </div>
    )
}
