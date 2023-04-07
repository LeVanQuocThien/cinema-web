import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import ChooseSeat from './Components/ChooseSeat/ChooseSeat'
import Home from './Components/Home/Home'
import MovieDetail from './Components/MovieDetail/MovieDetail'
import Payment from './Components/Payment/Payment'
import Theater from './Components/Theater/Theater'
import { useDispatch } from 'react-redux'
import Popup from './Components/Popup/Popup'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    let userInfo = localStorage.getItem('userInfo')
    dispatch({
      type: 'SET_CURRENT_USER',
      payload: userInfo ? JSON.parse(userInfo) : undefined
    })
  }, [])

  return (
    <div className='app'>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/theater' element={<Theater />} />
          <Route path='/movie/:movieID' element={<MovieDetail />} />
          <Route path='/chooseseat/:timeShowID' element={<ChooseSeat />}>
            <Route path='/chooseseat/:timeShowID/payment' element={<Payment />} />
          </Route>
          <Route />
        </Routes>
        <Popup />
      </BrowserRouter>
    </div>
  )
}
