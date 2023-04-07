import React, { useState } from 'react'
import './AddNewCard.scss'
import { useDispatch, useSelector } from 'react-redux'

export default function AddNewCard() {
    const dispatch = useDispatch()
    // const currentUser = useSelector(state => state.userManage.currentUser)
    const [card, setCard] = useState({
        BankId: '',
        CardNumber: '',
        CardName: '',
        ExpireDate: '',
        CVV: '',
    })
    const HandleInputCard = () => {

    }
    const HandleAddCard = () => {

    }

    return (
        <div className='addNewCard'>
            <h1>Add new card </h1>
            <div className='inputWrapper'>
                <input className='w46' name='BankId' onChange={HandleInputCard} placeholder='Bank ID' />
                <input className='w46' name='CardNumber' onChange={HandleInputCard} placeholder='Card number' />
                <input className='w100' name='CardName' onChange={HandleInputCard} placeholder='Card name' />
                <input className='w46' name='ExpireDate' onChange={HandleInputCard} placeholder='Expire date' />
                <input className='w46' name='CVV' onChange={HandleInputCard} placeholder='CVV number' />
            </div>
            <div className='btnAdd'><button onClick={HandleAddCard}>+</button></div>
        </div>
    )
}
