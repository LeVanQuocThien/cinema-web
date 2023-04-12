import React, { useEffect, useState } from 'react'
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineUser } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import './Register.scss'

export default function Register() {
    const dispatch = useDispatch()
    const allUser = useSelector(state => state.userManage.allUser?.map(e => e.Email))
    const [user, setUSer] = useState({
        Email: "",
        Name: "",
        Password: "",
        Role: "0"
    })
    const [errMess, setErrMess] = useState({
        Email: "",
        Name: "",
        Password: ""
    })
    useEffect(() => {
        dispatch({
            type: 'GET_API',
            payload: {
                link: `https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/user/user`,
                type: 'SET_ALL_USER'
            }
        })
    }, [dispatch, allUser])

    const ShowErrMess = (key, value) => {
        setErrMess(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const HandleChange = (event) => {
        let key = event.target.name;
        ShowErrMess(key, '')
        if (key === 'Email' && allUser.includes(event.target.value)) {
            ShowErrMess(key, `Already exist this Email`)
        } else { ShowErrMess(key, '') }
        setUSer({
            ...user,
            [key]: event.target.value
        })
    }
    const HandleRegister = () => {
        let isValid = !Object.keys(errMess).some(key => !!errMess[key])
        for (let key in user) {
            if (user[key].trim() === '') {
                ShowErrMess(key, `${key} is not blank`)
                isValid = false
                continue
            }
        }
        if (isValid) {
            fetch(`https://teachingserver.org/U2FsdGVkX19vV1e+G2Dt1h63IVituNJD+GdHSpis9+rOtKy+FbHJqg==/user/user`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(user)
            })
                .then(res => {
                    if (res.status === 200) {
                        let data = {
                            "Email": user.Email,
                            "Name": user.Name,
                            "Role": user.Role
                        }
                        localStorage.setItem('userInfo', JSON.stringify(data))
                        dispatch({ type: 'SET_CURRENT_USER', payload: data })
                        dispatch({ type: 'SET_SCREEN', payload: 'success' })

                    } else { alert('Please try again') }
                })
        }
    }
    return (
        <div className='register'>
            <h1>Register</h1>
            <div className='insertBox'>
                <input
                    onChange={(event) => { HandleChange(event) }}
                    name='Name' type={'text'} placeholder='Full name...'
                />
                <HiOutlineUser className='icon' />
                <span className='errMess'>{errMess.Name}</span>
            </div>
            <div className='insertBox'>
                <input
                    value={user.Email}
                    onChange={(event) => { HandleChange(event) }}
                    name='Email' type={'text'} placeholder='Email...'
                />
                <HiOutlineMail className='icon' />
                <span className='errMess'>{errMess.Email}</span>
            </div>
            <div className='insertBox'>
                <input
                    onChange={(event) => { HandleChange(event) }}
                    name='Password' type={'password'} placeholder='Password...'
                />
                <HiOutlineLockClosed className='icon' />
                <span className='errMess'>{errMess.Password}</span>
            </div>
            {/* <div className='insertBox'>
                <input onChange={(event) => { HandleChange(event) }} name='ReTap' type={'password'} placeholder='Confirm password...' />
                <HiDotsHorizontal className='icon' />
                <span className='errMess'>{errMess.ReTap}</span>
            </div> */}
            <div className='checkRemember'>
                <input name='' type={'checkbox'} />
                <span>I accept <span className='terms'>Terms of use</span></span>
            </div>
            <button onClick={HandleRegister}>Done</button>
            <p>
                Already have account?
                <span className='link' onClick={() => { dispatch({ type: 'SET_SCREEN', payload: "signIn" }) }}> Sign in</span>
            </p>
        </div>
    )
}
