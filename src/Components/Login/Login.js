import React, { useState } from 'react'
import './Login.scss'
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi'
import { useDispatch } from 'react-redux'

export default function Login() {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        Email: "",
        Password: ""
    })
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
                dispatch({ type: 'DISAPPEAR' })
            })
            .catch(() => {
                alert('Please check your account again')
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
            <button onClick={HandleLogin}>Log in</button>
            <p>
                Don't have account?
                <span className='link' onClick={() => { dispatch({ type: 'SET_SCREEN', payload: "register" }) }}> Register</span>
            </p>
        </div>
    )
}
