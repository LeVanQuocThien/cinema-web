import React, { useEffect, useRef, useState } from 'react'
import './Login.scss'
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

export default function Login() {

    const messRef = useRef(), loginRef = useRef()
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        Email: "",
        Password: ""
    })
    //======= Show wrong message =============
    const [timeShow, setTimeShow] = useState()

    const HandleInput = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }
    const HandleLogin = () => {
        fetch(`https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/user/Login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'SET_CURRENT_USER',
                    payload: data
                })
                localStorage.setItem('userInfo', JSON.stringify(data))
                dispatch({ type: 'SET_SCREEN', payload: 'success' })
            })
            .catch(() => {
                loginRef.current.classList.add('wrongInput');
                setTimeout(() => {
                    loginRef.current.classList.remove('wrongInput');
                }, 200)
                //======== reset time show message =========
                setTimeShow(prev => {
                    clearTimeout(prev)
                    return setTimeout(() => {
                        messRef.current.style.animation = 'fadeOut 0.4s linear'
                        setTimeout(() => {
                            setTimeShow(undefined)
                        }, 350)
                    }, 1800)
                })

            })
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <div className='insertBox'>
                <input onChange={HandleInput} name='Email' type={'text'} placeholder='Email' />
                <HiOutlineMail className='icon' />
            </div>
            <div className='insertBox'>
                <input onChange={HandleInput} name='Password' type={'password'} placeholder='Password' />
                <HiOutlineLockClosed className='icon' />
            </div>
            <div className='checkRemember'>
                <input type={'checkbox'} />
                <span>Remember password</span>
            </div>
            <div className='btnLogin'>
                <button ref={loginRef} onClick={HandleLogin}>Done</button>
                {timeShow && <span ref={messRef}>Email or Password is not correct. Please check it again.</span>}
            </div>
            <p>
                Don't have account?
                <span className='link' onClick={() => { dispatch({ type: 'SET_SCREEN', payload: "register" }) }}> Register</span>
            </p>
        </div>
    )
}
