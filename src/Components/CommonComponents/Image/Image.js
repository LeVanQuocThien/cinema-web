import React from 'react'
import { RiLoaderFill } from 'react-icons/ri'
import './Image.scss'

export const Logo = ({ width, height }) => {
    return (
        <img
            width={width}
            height={height}
            src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png'
            alt=''
        />
    )
}
export const ScanCode = ({ width, height }) => {
    return (
        <img
            width={width}
            height={height}
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'
            alt=''
        />
    )
}
export const Loading = ({ size }) => {
    return (
        <RiLoaderFill fontSize={size} className='loadingImg' />
    )
}

